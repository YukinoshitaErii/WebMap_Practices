import datetime
import time

import pandas as pd
import geopandas as geopd
import numpy as np
import argparse
import json
import os
import schedule

# receive parameter
parser = argparse.ArgumentParser(description='argparse testing')
parser.add_argument('--path', '-p', type=str, default="", required=False, help="the location of json")
parser.add_argument('--output', '-o', type=str, default="", required=False, help="the location to save data")
parser.add_argument('--time', '-t', type=str, default="", help='date of request')
args = parser.parse_args()

# global variable
# location data to be saved
FILE_LOCATION = args.output
# location of json
JSON_LOCATION = args.path
# specified time
TIME = args.time
# login info
TOKEN = "Y2hyaXN0MDAwOk1qZ3hPVEl6TVdoQWMzUjFaR1Z1ZEM1bmJHRXVZV011ZFdzPToxNjc2MzI2MjMzOmY2N2QzMDc5MGE2YjBhM2ZiMTU3MGFiMDVmMjk5ZGZhYTBiMWFjNTI"
URL = "https://nrt4.modaps.eosdis.nasa.gov/api/v2/content/archives/FIRMS/"
# class
LANDSAT = 'landsat'
MODIS = 'modis-c6.1'
VIIRS = 'noaa-20-viirs-c2'
# area
AREA = 'USA_contiguous_and_Hawaii'
# firms
FIRMS = "FIRMS"

"""
common function
"""


# convert date and julian date
# sign 1 date to julian, date is a datetime object
# sign 0 julian to date, date is a Dataframe object
# sign 2 is non pandas version of 0
def convert(date, sign):
    month_PERPETUAL = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    month_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if sign == 1:
        j_day = date.day
        for m in range(date.month - 1):
            if date.year % 4 == 0:
                j_day = j_day + month_LEAP[m]
            else:
                j_day = j_day + month_PERPETUAL[m]
        return j_day
    elif sign == 0:
        date['Date'] = np.zeros(date.shape[0])
        date_d = []
        x = datetime.datetime.now()
        for i in range(date.shape[0]):
            d1 = int(date.iloc[i, 5][4:])
            d_day = 0
            d_month = 1
            if x.year % 4 == 0:
                for m in month_LEAP:
                    if d1 <= m:
                        d_day = d1
                        break
                    else:
                        d1 = d1 - m
                        d_month = d_month + 1
            else:
                for m in month_PERPETUAL:
                    if d1 <= m:
                        d_day = d1
                        break
                    else:
                        d1 = d1 - m
                        d_month = d_month + 1
            time = datetime.datetime(int(date.iloc[i, 5][0:4]), d_month, d_day)
            date_time = time.strftime("%Y-%m-%d")
            date.iloc[i, 6] = date_time
        return date
    if sign == 2:
        x = datetime.datetime.now()
        d_day = 0
        d_month = 1
        if type(date) == np.int64:
            d1 = date % 1000
            d2 = date // 1000
        else:
            d1 = int(date[-3:])
            d2 = int(date[:4])
        if x.year % 4 == 0:
            for m in month_LEAP:
                if d1 <= m:
                    d_day = d1
                    break
                else:
                    d1 = d1 - m
                    d_month = d_month + 1
        else:
            for m in month_PERPETUAL:
                if d1 <= m:
                    d_day = d1
                    break
                else:
                    d1 = d1 - m
                    d_month = d_month + 1
        time = datetime.datetime(d2, d_month, d_day)
        date_time = time.strftime("%Y-%m-%d")
        return date_time


"""
convert json,pandas to geojson
"""


# pandas to geopandas
def to_geopd(df):
    gdf = geopd.GeoDataFrame(
        df, geometry=geopd.points_from_xy(df.longitude, df.latitude), crs="EPSG:4326"
    )
    return gdf

# geopandas to geojson
def to_geojson(gdf,path,file):
    file = file+'.geojson'
    gdf.to_file(os.path.join(path,file), driver="GeoJSON")

def convert_geo_save(df,path='./resources',file=''):
    gdf = to_geopd(df)
    if gdf.shape[0]<2:
        print(file)
    to_geojson(gdf,path,file)




"""
initiate mode
"""


# download data to corresponding location
def download_data(data_class, area, location):
    for m in data_class:
        result = os.system(
            f'wget -e robots=off -m -np -R .html,.tmp -nH --cut-dirs=3 "https://nrt4.modaps.eosdis.nasa.gov/api/v2/content/archives/{FIRMS}/{m}/{area}/" --header "Authorization: Bearer {TOKEN}" -P {location}')
        if result == 0:
            print("the download is successful")
        else:
            print("the download is not successful")


# Retrive directionary and built json list
def retrive_data(file_location='.', data_class=[]):
    a = os.getcwd()
    if not os.path.exists(a+'/resources'):
        os.mkdir(a+'/resources')
    df = pd.DataFrame(columns=['file_name', 'class', 'collection', "area", 'data_type_name', 'julian day','Date','file'])
    for c in data_class:
        if c == VIIRS:
            for root, dirs, files in os.walk(os.path.join(file_location, 'archives', 'FIRMS', c)):
                for f in files:
                    if f[-4:] == '.txt':
                        df.loc[len(df)] = [f[:-4], c, f[9:11], f[12:37], f[38:53], f[54:-4],convert(f[54:-4], 2),'https://raw.githubusercontent.com/YukinoshitaErii/WebMap_Practices/main/resourves/'+f[:-4]+'.geojson']
                        df1 = pd.read_csv(os.path.join(root,f),
                                          delimiter=",")
                        convert_geo_save(df1,a+'/resources',f[:-4])
                        with open(os.path.join(a,'resources',f[:-4]+'.geojson')) as json_file:
                            data = json.load(json_file)
                        del data['crs']
                        with open(os.path.join(a,'resources',f[:-4]+'.geojson'), 'w', encoding='utf-8') as f:
                            json.dump(data, f, ensure_ascii=False)

        elif c == MODIS:
            for root, dirs, files in os.walk(os.path.join(file_location, 'archives', 'FIRMS', c)):
                for f in files:
                    if f[-4:] == '.txt':
                        df.loc[len(df)] = [f[:-4], c, f[6:10], f[11:36], f[37:48], f[49:-4],convert(f[49:-4], 2),'https://raw.githubusercontent.com/YukinoshitaErii/WebMap_Practices/main/resourves/'+f[:-4]+'.geojson']
                        df1 = pd.read_csv(os.path.join(root,f),
                                          delimiter=",")
                        convert_geo_save(df1,a+'/resources',f[:-4])
                        with open(os.path.join(a,'resources',f[:-4]+'.geojson')) as json_file:
                            data = json.load(json_file)
                        del data['crs']
                        with open(os.path.join(a,'resources',f[:-4]+'.geojson'), 'w', encoding='utf-8') as f:
                            json.dump(data, f, ensure_ascii=False)
        elif c == LANDSAT:
            for root, dirs, files in os.walk(os.path.join(file_location, 'archives', 'FIRMS', c)):
                for f in files:
                    if f[-4:] == '.txt':
                        print(f)
                        df.loc[len(df)] = [f[:-4], c, '0', f[8:33], "0", f[-11:-4],convert(f[-11:-4], 2),'https://raw.githubusercontent.com/YukinoshitaErii/WebMap_Practices/main/resourves/'+f[:-4]+'.geojson']
                        df1 = pd.read_csv(os.path.join(root,f),
                                          delimiter=",")
                        convert_geo_save(df1,a+'/resources',f[:-4])
                        with open(os.path.join(a,'resources',f[:-4]+'.geojson')) as json_file:
                            data = json.load(json_file)
                        del data['crs']
                        with open(os.path.join(a,'resources',f[:-4]+'.geojson'), 'w', encoding='utf-8') as f:
                            json.dump(data, f, ensure_ascii=False)
    df.to_json('./list.json')


"""
update mode
"""


def update_json(file_location='.', data_class=[], df=pd.DataFrame):
    a = os.getcwd()
    if not os.path.exists(a+'/resources'):
        os.mkdir(a+'/resources')
    for c in data_class:
        if c == VIIRS:
            for root, dirs, files in os.walk(os.path.join(file_location, 'archives', 'FIRMS', c)):
                for f in files:
                    if f[-4:] == '.txt':
                        if f[-4:] not in df['file_name'].values:
                            df.loc[len(df)] = [f[:-4], c, f[9:11], f[12:37], f[38:53], f[54:-4], convert(f[54:-4], 2),'https://raw.githubusercontent.com/YukinoshitaErii/WebMap_Practices/main/resourves/'+f[:-4]+'.geojson']
                            df1 = pd.read_csv(os.path.join(root, f),
                                              delimiter=",")
                            convert_geo_save(df1, a+'/resources', f[:-4])
                            with open(os.path.join(a, 'resources', f[:-4] + '.geojson')) as json_file:
                                data = json.load(json_file)

                            del data['crs']

                            with open(os.path.join(a, 'resources', f[:-4] + '.geojson'), 'w', encoding='utf-8') as f:
                                json.dump(data, f, ensure_ascii=False)
        elif c == MODIS:
            for root, dirs, files in os.walk(os.path.join(file_location, 'archives', 'FIRMS', c)):
                for f in files:
                    if f[-4:] == '.txt':
                        if f[:-4] not in df['file_name'].values:
                            df.loc[len(df)] = [f[:-4], c, f[6:10], f[11:36], f[37:48], f[49:-4], convert(f[49:-4], 2),'https://raw.githubusercontent.com/YukinoshitaErii/WebMap_Practices/main/resourves/'+f[:-4]+'.geojson']
                            df1 = pd.read_csv(os.path.join(root, f),
                                              delimiter=",")
                            convert_geo_save(df1, a+'/resources', f[:-4])
                            with open(os.path.join(a, 'resources', f[:-4] + '.geojson')) as json_file:
                                data = json.load(json_file)

                            del data['crs']

                            with open(os.path.join(a, 'resources', f[:-4] + '.geojson'), 'w', encoding='utf-8') as f:
                                json.dump(data, f, ensure_ascii=False)
        elif c == LANDSAT:
            for root, dirs, files in os.walk(os.path.join(file_location, 'archives', 'FIRMS', c)):
                for f in files:
                    if f[-4:] == '.txt':
                        if f[:-4] not in df['file_name'].values:
                            df.loc[len(df)] = [f[:-4], c, '0', f[8:33], "0", f[-11:-4], convert(f[-11:-4], 2),'https://raw.githubusercontent.com/YukinoshitaErii/WebMap_Practices/main/resourves/'+f[:-4]+'.geojson']
                            df1 = pd.read_csv(os.path.join(root, f),
                                              delimiter=",")
                            convert_geo_save(df1, a+'/resources', f[:-4])
                            with open(os.path.join(a, 'resources', f[:-4] + '.geojson')) as json_file:
                                data = json.load(json_file)
                            del data['crs']
                            with open(os.path.join(a, 'resources', f[:-4] + '.geojson'), 'w', encoding='utf-8') as f:
                                json.dump(data, f, ensure_ascii=False)
    df.to_json('./list.json')


"""
detect initiate or update
"""


def detect():
    n = 0
    # if there is no json file/data then initiate it
    if not os.path.exists('./archives'):
        print('do 1')
        download_data([MODIS, LANDSAT, VIIRS], AREA, '.')
        git(n)
    elif not os.path.exists('./list.json'):
        print("do 2")
        retrive_data('.', [MODIS, LANDSAT, VIIRS])
        git(n)
    # update mode
    else:
        print('do 3')
        x = datetime.datetime.now()
        x1 = np.datetime64(x.strftime("%Y-%m-%d"))
        df1 = pd.read_json('./list.json')
        if x1 not in df1['Date'].values:
            # download specific file
            download_data([MODIS, LANDSAT, VIIRS], AREA, '.')
            # update json
            df1 = pd.read_json('./list.json')
            update_json('.', data_class=[MODIS, LANDSAT, VIIRS], df=df1)
            # optional do the specific date
            git(n)


def git(n):
    n = n+1
    os.system('git pull origin')
    os.system('git add --all')
    os.system(f"git commit -m 'test {n}'")
    os.system('git push origin main')



if __name__ == '__main__':
    detect()


# schedule.every().hour.do(detect)
# while True:
#     schedule.run_pending()
#     time.sleep(1)


