import pygame

from pygame import display

from pygame.constants import MOUSEBUTTONUP

from random import*



\#레벨에 맞게 설정



def setup(level):

  \#얼마나 많은 숫자를 보여줄 것인가?

  global display_time

  

  display_time = 5 -(level//3)

  display_time = max(display_time,1) #1초미만이면 1초로 처리

  

  number_count =(level//3)+5

  number_count = min(number_count,20) # 최대 20으로 설정

  

  \# 실제 화면에 grid 형태로 숫자를 랜덤으로 배치

  

  shuffle_grid(number_count)

  



\# 숫자 섞기 (이 프로젝트에서 가장 중요)



def shuffle_grid(number_count):

  rows =5

  columns =9

  

  cell_size = 130

  button_size =110

  screen_left_margin =55

  screen_top_margin =20

  

  

  

  

  grid = [[0 for col in range(columns)]for row in range(rows)]

  \# for row in range(rows) = 줄마다 반복

  

  number =1 # 시작 숫자를 1부터 number_count 까지 , 만약 5라면 5까지 숫자를 랜덤으로 배치

  while number <= number_count:

​    row_idx = randrange(0,rows)

​    col_idx = randrange(0,columns)

​    

​    if grid[row_idx][col_idx] ==0:

​      grid[row_idx][col_idx] = number #숫자 지정

​      number += 1

​      

​      \# 현재 grid cell 위치 기준으로 x,y 위치를 구함

​      center_x = screen_left_margin +(col_idx* cell_size) +(cell_size/2)

​      center_y = screen_top_margin + (row_idx*cell_size) +(cell_size/2)

​      

​      \# 숫자 버튼 만들기

​      button =pygame.Rect(0,0, button_size,button_size)

​      button.center =(center_x, center_y)

​      

​      number_buttons.append(button)

​      

​      

​      

  \# 배치된 숫자를 확인

  print(grid)





\#시작 화면 보여주기



def display_start_screen():

 

  pygame.draw.circle(screen, WHITE,start_button.center,60,5) #스타트버튼에 동그라미 그려주기

\# 스크린에 그리고, 색은 화이트. 스타트버튼의 중심값은 센터값에 그리고, 반지름은 60으로 한다. 두께는 5



  msg = game_font.render(f"{curr_level}",True,WHITE)

  msg_rect =msg.get_rect(center=start_button.center)

  screen.blit(msg, msg_rect)

​    

  

  

\#pos 에 해당하는 버튼 확인



def check_buttons(pos):

  global start, start_ticks #전역변수라서, 밖에서 쓰는거라 선언해줘야함.

  

  if start:

​    check_number_buttons(pos)

  elif start_button.collidepoint(pos): # 게임이 시작했으면?

​    

​    start = True

​    start_ticks = pygame.time.get_ticks() #타이머 시작 , 현재시각을 저장

​    

  \# if start_button.collidepoint(pos):

  \#   start = True  

​    

def check_number_buttons(pos):

  global hidden,start,curr_level

  

  for button in number_buttons:

​    if button.collidepoint(pos):

​      if button == number_buttons[0]:

​        print("Correct")

​        del number_buttons[0]

​        

​        if not hidden:

​          hidden = True #숫자 숨김 처리

​    else: #잘못된 숫자

​      game_over()

​    break

  



  

  \# 모든 숫자를 다 맞췄다면 다음 레벨로.

  if len(number_buttons)== 0:   

​    start =False

​    hidden =False

​    curr_level +=1

​    setup(curr_level)

  

\# 게임 종료 처리. 메시지도 보여줌



def game_over():

  

  global running

  running =False

  

  msg = game_font.render(f"Your level is {curr_level}",True,WHITE)

  msg_rect =msg.get_rect(center=(screen_width/2, screen_height/2))

  screen.fill(BLACK)

  screen.blit(msg,msg_rect)

​    

\# 게임 화면 보여주기

  

def display_game_screen():

  global hidden 

  

  if not hidden:

​    elapsed_time =(pygame.time.get_ticks()- start_ticks)/1000

​    if elapsed_time > display_time:

​      hidden =True

  \# print("Game Start")

  for idx, rect in enumerate(number_buttons, start=1):

​    

​    if hidden : #숨김처리

​      \#버튼 사각형 그리기

​      

​      pygame.draw.rect(screen,WHITE, rect)

  

  

  \#실제 숫자 텍스트

​    else:

  

​      cell_text = game_font.render(str(idx),True,WHITE)

​      text_rect = cell_text.get_rect(center=rect.center)

​      screen.blit(cell_text, text_rect)



  

  





\# 초기화



pygame.init()

screen_width =1280 #가로크기

screen_height = 720 #세로크기

screen = pygame.display.set_mode((screen_width,screen_height))    #튜플형태로 넣기위해서 한번더 가로를 넣는다.

pygame.display.set_caption("Hayeon game")

game_font =pygame.font.Font(None,120) #폰트 정의





\# 시작 버튼

start_button =pygame.Rect(0,0,120,120)

start_button.center=(120,screen_height-120) # x,y좌표





\# 색깔



BLACK =(0,0,0) # RCB

WHITE =(255,255,255)

GRAY =(50,50,50)



number_buttons =[] # 플레이어가 눌러야 하는 버튼

curr_level =1

display_time =None # 숫자를 보여주는 시간

start_ticks =None # 시간 계산

\# 게임 시작 여부

start =False

\# 숫자 숨김 여부 (사용자가 1을 클릭했거나, 보여주는 시간을 초과했을때)

hidden = False

\# 게임 시작전에 게임 설정 함수 실행



setup(curr_level)



\#게임 루프



running = True # 게임 실행중인지 확인

while running:

  

  click_pos = None

  

  \#이벤트 루프

  for event in pygame.event.get(): #어떤 이벤트가 발생하였는가?

​    if event.type == pygame.QUIT: #창이 닫히는 이벤트인가?

​      running =False # 게임이 더 이상 실행중이 아님.

​      

​    elif event.type == pygame.MOUSEBUTTONUP:

​      click_pos = pygame.mouse.get_pos()

​      print(click_pos)

​      

  

  \#화면 전체를 까맣게 칠하기

  screen.fill(BLACK)

  

  if start : # 게임 화면 표시

​    display_game_screen()

  

  else:

​    display_start_screen() #시작 화면 표시

​    

​    

  \# 사용자가 클릭한 좌표값이 있다면 (어딘가 클릭했다면)

  

  if click_pos:

​    check_buttons(click_pos)

​    

​    

  

  

  

  \#화면 업데이트

  pygame.display.update()  

  

  

  \# 시작 화면 표시

  display_start_screen()





  

  



pygame.time.delay(5000)      



\#게임 종료



pygame.quit() # 게임실행중이 아니니까 루프탈출