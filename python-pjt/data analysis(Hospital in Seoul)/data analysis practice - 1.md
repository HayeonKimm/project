# 필요한 라이브러리 선언하기


```python
import pandas as pd
import numpy as np
import seaborn as sns
```


```python
import matplotlib.pyplot as plt
plt.rc('font',family= 'Malgun Gothic')  # 한글깨짐방지 두줄.
plt.rc('axes',unicode_minus=False)


# 그래프가 노트북 안에 보이게 하기 위해
%matplotlib inline
```


```python
from IPython.display import set_matplotlib_formats

set_matplotlib_formats('retina')
```

# 데이터 로드하기


```python
df=pd.read_csv("소상공인시장진흥공단_상가업소정보_의료기관_201909.csv",low_memory=False)
df.shape
# low_memory는 mixed types를 방지하기위해
```




    (91335, 39)



# 데이터 미리보기


```python
df.head(1)
#shift +tab 은 docstring. 도움말 볼 수 있다.
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>상가업소번호</th>
      <th>상호명</th>
      <th>지점명</th>
      <th>상권업종대분류코드</th>
      <th>상권업종대분류명</th>
      <th>상권업종중분류코드</th>
      <th>상권업종중분류명</th>
      <th>상권업종소분류코드</th>
      <th>상권업종소분류명</th>
      <th>표준산업분류코드</th>
      <th>...</th>
      <th>건물관리번호</th>
      <th>건물명</th>
      <th>도로명주소</th>
      <th>구우편번호</th>
      <th>신우편번호</th>
      <th>동정보</th>
      <th>층정보</th>
      <th>호정보</th>
      <th>경도</th>
      <th>위도</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>19956873</td>
      <td>하나산부인과</td>
      <td>NaN</td>
      <td>S</td>
      <td>의료</td>
      <td>S01</td>
      <td>병원</td>
      <td>S01B10</td>
      <td>산부인과</td>
      <td>Q86201</td>
      <td>...</td>
      <td>4127310900110810000010857</td>
      <td>산호한양아파트</td>
      <td>경기도 안산시 단원구 달미로 10</td>
      <td>425764.0</td>
      <td>15236.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>126.814295</td>
      <td>37.336344</td>
    </tr>
  </tbody>
</table>
<p>1 rows × 39 columns</p>
</div>




```python
df.tail()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>상가업소번호</th>
      <th>상호명</th>
      <th>지점명</th>
      <th>상권업종대분류코드</th>
      <th>상권업종대분류명</th>
      <th>상권업종중분류코드</th>
      <th>상권업종중분류명</th>
      <th>상권업종소분류코드</th>
      <th>상권업종소분류명</th>
      <th>표준산업분류코드</th>
      <th>...</th>
      <th>건물관리번호</th>
      <th>건물명</th>
      <th>도로명주소</th>
      <th>구우편번호</th>
      <th>신우편번호</th>
      <th>동정보</th>
      <th>층정보</th>
      <th>호정보</th>
      <th>경도</th>
      <th>위도</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>91330</th>
      <td>16196725</td>
      <td>온누리약국</td>
      <td>베스트</td>
      <td>S</td>
      <td>의료</td>
      <td>S02</td>
      <td>약국/한약방</td>
      <td>S02A01</td>
      <td>약국</td>
      <td>G47811</td>
      <td>...</td>
      <td>3017011200115070000021096</td>
      <td>NaN</td>
      <td>대전광역시 서구 문예로 67</td>
      <td>302831.0</td>
      <td>35240.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>127.389865</td>
      <td>36.352728</td>
    </tr>
    <tr>
      <th>91331</th>
      <td>16192180</td>
      <td>리원</td>
      <td>봄산후조</td>
      <td>S</td>
      <td>의료</td>
      <td>S07</td>
      <td>의료관련서비스업</td>
      <td>S07A07</td>
      <td>산후조리원</td>
      <td>S96993</td>
      <td>...</td>
      <td>4128112300111460000011715</td>
      <td>청한프라자</td>
      <td>경기도 고양시 덕양구 성신로 14</td>
      <td>412827.0</td>
      <td>10503.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>126.830144</td>
      <td>37.627530</td>
    </tr>
    <tr>
      <th>91332</th>
      <td>16127538</td>
      <td>참좋은요양병원</td>
      <td>NaN</td>
      <td>S</td>
      <td>의료</td>
      <td>S01</td>
      <td>병원</td>
      <td>S01B17</td>
      <td>노인/치매병원</td>
      <td>Q86102</td>
      <td>...</td>
      <td>2641010800105380001005572</td>
      <td>한신시티빌</td>
      <td>부산광역시 금정구 금강로 209</td>
      <td>609841.0</td>
      <td>46294.0</td>
      <td>NaN</td>
      <td>2</td>
      <td>NaN</td>
      <td>129.082790</td>
      <td>35.227138</td>
    </tr>
    <tr>
      <th>91333</th>
      <td>16108681</td>
      <td>경희중앙한의원</td>
      <td>NaN</td>
      <td>S</td>
      <td>의료</td>
      <td>S01</td>
      <td>병원</td>
      <td>S01B06</td>
      <td>한의원</td>
      <td>Q86203</td>
      <td>...</td>
      <td>1174010500103450009002392</td>
      <td>NaN</td>
      <td>서울특별시 강동구 천중로 213</td>
      <td>134811.0</td>
      <td>5303.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>127.143958</td>
      <td>37.540993</td>
    </tr>
    <tr>
      <th>91334</th>
      <td>16109073</td>
      <td>천안김안과천안역본점의원</td>
      <td>NaN</td>
      <td>S</td>
      <td>의료</td>
      <td>S01</td>
      <td>병원</td>
      <td>S01B13</td>
      <td>안과의원</td>
      <td>Q86201</td>
      <td>...</td>
      <td>4413110700102660017016314</td>
      <td>김안과</td>
      <td>충청남도 천안시 동남구 중앙로 92</td>
      <td>330952.0</td>
      <td>31127.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>127.152651</td>
      <td>36.806640</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 39 columns</p>
</div>




```python
df.sample() #하나만 미리보기
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>상가업소번호</th>
      <th>상호명</th>
      <th>지점명</th>
      <th>상권업종대분류코드</th>
      <th>상권업종대분류명</th>
      <th>상권업종중분류코드</th>
      <th>상권업종중분류명</th>
      <th>상권업종소분류코드</th>
      <th>상권업종소분류명</th>
      <th>표준산업분류코드</th>
      <th>...</th>
      <th>건물관리번호</th>
      <th>건물명</th>
      <th>도로명주소</th>
      <th>구우편번호</th>
      <th>신우편번호</th>
      <th>동정보</th>
      <th>층정보</th>
      <th>호정보</th>
      <th>경도</th>
      <th>위도</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>43913</th>
      <td>22398394</td>
      <td>고승연신경외과</td>
      <td>NaN</td>
      <td>S</td>
      <td>의료</td>
      <td>S01</td>
      <td>병원</td>
      <td>S01B07</td>
      <td>내과/외과</td>
      <td>Q86201</td>
      <td>...</td>
      <td>4213010500104520013003816</td>
      <td>NaN</td>
      <td>강원도 원주시 남원로 548</td>
      <td>220932.0</td>
      <td>26448.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>127.947669</td>
      <td>37.333074</td>
    </tr>
  </tbody>
</table>
<p>1 rows × 39 columns</p>
</div>




```python
df.info() #데이터 요약한걸 보여준다. object는 문자열로 된 데이터타입
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 91335 entries, 0 to 91334
    Data columns (total 39 columns):
     #   Column     Non-Null Count  Dtype  
    ---  ------     --------------  -----  
     0   상가업소번호     91335 non-null  int64  
     1   상호명        91335 non-null  object 
     2   지점명        1346 non-null   object 
     3   상권업종대분류코드  91335 non-null  object 
     4   상권업종대분류명   91335 non-null  object 
     5   상권업종중분류코드  91335 non-null  object 
     6   상권업종중분류명   91335 non-null  object 
     7   상권업종소분류코드  91335 non-null  object 
     8   상권업종소분류명   91335 non-null  object 
     9   표준산업분류코드   86413 non-null  object 
     10  표준산업분류명    86413 non-null  object 
     11  시도코드       90956 non-null  float64
     12  시도명        90956 non-null  object 
     13  시군구코드      90956 non-null  float64
     14  시군구명       90956 non-null  object 
     15  행정동코드      91335 non-null  int64  
     16  행정동명       90956 non-null  object 
     17  법정동코드      91280 non-null  float64
     18  법정동명       91280 non-null  object 
     19  지번코드       91335 non-null  int64  
     20  대지구분코드     91335 non-null  int64  
     21  대지구분명      91335 non-null  object 
     22  지번본번지      91335 non-null  int64  
     23  지번부번지      72079 non-null  float64
     24  지번주소       91335 non-null  object 
     25  도로명코드      91335 non-null  int64  
     26  도로명        91335 non-null  object 
     27  건물본번지      91335 non-null  int64  
     28  건물부번지      10604 non-null  float64
     29  건물관리번호     91335 non-null  object 
     30  건물명        46453 non-null  object 
     31  도로명주소      91335 non-null  object 
     32  구우편번호      91323 non-null  float64
     33  신우편번호      91333 non-null  float64
     34  동정보        7406 non-null   object 
     35  층정보        44044 non-null  object 
     36  호정보        15551 non-null  object 
     37  경도         91335 non-null  float64
     38  위도         91335 non-null  float64
    dtypes: float64(9), int64(7), object(23)
    memory usage: 27.2+ MB
    


```python
#컬럼명만 출력
df.columns
```




    Index(['상가업소번호', '상호명', '지점명', '상권업종대분류코드', '상권업종대분류명', '상권업종중분류코드',
           '상권업종중분류명', '상권업종소분류코드', '상권업종소분류명', '표준산업분류코드', '표준산업분류명', '시도코드',
           '시도명', '시군구코드', '시군구명', '행정동코드', '행정동명', '법정동코드', '법정동명', '지번코드',
           '대지구분코드', '대지구분명', '지번본번지', '지번부번지', '지번주소', '도로명코드', '도로명', '건물본번지',
           '건물부번지', '건물관리번호', '건물명', '도로명주소', '구우편번호', '신우편번호', '동정보', '층정보',
           '호정보', '경도', '위도'],
          dtype='object')




```python
# 데이터 타입만 출력
df.dtypes
```




    상가업소번호         int64
    상호명           object
    지점명           object
    상권업종대분류코드     object
    상권업종대분류명      object
    상권업종중분류코드     object
    상권업종중분류명      object
    상권업종소분류코드     object
    상권업종소분류명      object
    표준산업분류코드      object
    표준산업분류명       object
    시도코드         float64
    시도명           object
    시군구코드        float64
    시군구명          object
    행정동코드          int64
    행정동명          object
    법정동코드        float64
    법정동명          object
    지번코드           int64
    대지구분코드         int64
    대지구분명         object
    지번본번지          int64
    지번부번지        float64
    지번주소          object
    도로명코드          int64
    도로명           object
    건물본번지          int64
    건물부번지        float64
    건물관리번호        object
    건물명           object
    도로명주소         object
    구우편번호        float64
    신우편번호        float64
    동정보           object
    층정보           object
    호정보           object
    경도           float64
    위도           float64
    dtype: object




```python

```
