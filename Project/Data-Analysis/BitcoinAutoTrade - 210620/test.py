import pyupbit

access = "ppWOs872nz4KdThVEZzRxNWL8VJVopILUrlZms1b"          # 본인 값으로 변경
secret = "xXktltWqbDDVB47osoj0pSTTBjLjwSdxLryARS6k"          # 본인 값으로 변경
upbit = pyupbit.Upbit(access, secret)


print(upbit.get_balance("KRW-XRP"))     # KRW-XRP 조회
print(upbit.get_balance("KRW"))         # 보유 현금 조회
