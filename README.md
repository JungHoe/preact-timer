# Simple-Timer

GPT 에게 개발을 시켰다. ~~(문법 틀려도 알아서 해석해줌 ㄷㄷ)~~
```
make timer ui  based on react.
1. user can setting timer minute and second
2.  timer is circle and the border is decrease when time running out

-->
make start button and pause button

-->
I want to display minute and second inside of circle
and when timer's status is "start" can 't edit and time is decrease

-->
please change this code to typescript
```

## 🕹 Toy?


 * E북으로 책읽다 자꾸 집중력이 흐트러져서 5분만 버텨보자 해서 만듬
   *  ~~하다보면 집중력이 늘지않을까 ㅇㅅㅇ;~~


## 🌱 Insight

* GPT 에게 명령 잘내리면 코딩편하게 할수있음
  * 요구사항을 더 명확하게 내리면 더 제대로된 코드가 나옴
    * 한글로 질문하는게 더 나을수도?
* react -> [preact 변경시 svg 이슈](https://preactjs.com/guide/v8/differences-to-react/)
``` 
Synthetic Events: Preact's browser support target does not require this extra overhead
``` 