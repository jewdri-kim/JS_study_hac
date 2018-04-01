# Chapter01 객체지향 프로그래밍 기초



# L01_절차지향프로그래밍 VS 객체지향 프로그래밍



## 01_절차지향 프로그래밍

- 문제를 여러개의 작은 함수로 나눠 작성
- 기존에 우리들이 작업할때 쓰였던 일반적인 방식
- 언어 대표적인 예 : C, 파스칼, 코볼 -> 초기 프로그래밍 언어가 대표적으로 지원하는 방식



### 절차지향 프로그래밍 특징

- 전역 데이터를 공유해서 사용한다.

### 절차지향 프로그래밍 예

####예제01>함수기반의 탭메뉴

```javascript
var $tabMenuItems = null;
var $tab2MenuItems = null;

$(document).ready(function(){
    //탭메뉴 데이터 작성
    $tabMenuItems = $('#tabMenu1 li');
    $tab2MenuItems = $('#tabMenu2 li');

    //탭메뉴 생성
    tabMenu($tabMenuItems);
    tabMenu($tab2MenuItems);
});

// 탭메뉴 생성
function tabMenu($menuItems){
    $menuItems.click(function(){
        selectMenuItemAt($menuItems, $(this).index());
    });
}

function selectMenuItemAt($menuItems, index){
    $menuItems.remove('select');
    $manuItems.eq(index).addClass('select');
}
```

- 탭메뉴 아이텝정보를 매개변수 값으로 넘겨 사용. 

tabMenu($tab1MenuItems) ->selectMenuItem($ab1MenuItems)

#### 예제02>함수기반 탭메뉴에 리셋 처리 기능추가

```javascript

var $tabMenuItems = null;
var $tab2MenuItems = null;

$(document).ready(function(){
    //탭메뉴 데이터 작성
    $tabMenuItems = $('#tabMenu1 li');
    $tab2MenuItems = $('#tabMenu2 li');

    //탭메뉴 생성
    tabMenu($tabMenuItems);
    tabMenu($tab2MenuItems);

    // 탭메뉴 선택 초기화
    $('#btnReset').click(function(){
        resetTabMenu($tab1MenuItems);
        resetTabMenu($tab2MenuItems);
    });
});

// 탭메뉴 생성
function tabMenu($menuItems){
    $menuItems.click(function(){
        selectMenuItemAt($menuItems, $(this).index());
    });
}

function selectMenuItemAt($menuItems, index){
    $menuItems.remove('select');
    $manuItems.eq(index).addClass('select');
}

// 탭메뉴 선택 초기화 
function resetTabMenu($menuItems){
    $menuItems.removeClass('select');
}
```

**리셋버튼 클릭시 선택초기화를 처리하는 resetTabMenu 함수호출시 -> 메뉴아이템정보($menuItems)를 매개변수 값으로 넘겨 사용 => 절차지향 프로그래밍**



### 절차지향 프로그래밍의 단점

- 전역 데이터를 매개변수 값으로 넘겨 공유해서 사용하는 구조이기 때문에 전역데이터가 잘못 처리 될 수 있는 치명적인 단점
- 데이터가 보호되지 않는다.
- 하나의 프로젝트를 여러사람으로 나눠작업하는 방식에서 적합하지않다.
- 비슷한게 - 구조적 프로그래밍, 함수기반프로그래밍 => 데이터를 전역에두고 사용



## 02_객체지향 프로그래밍

- 객체지향 Object Oriented Programming)
- 객체지향프로그래밍과 클래스단위 프로그래밍이랑은 다르다.
- OOP는 여러개의 객체단위로 나눠작업하는 방식이다.
- 철학같은것.
- 여러 프로그래밍 시행착오를 거쳐 가장 유지보수 하기 편하고.그런 방법이 OOP (위대한 프로그램에 대하여.)
- 대표적인 언어로는 JAVA, C# 등 



#### 예제03> 객체지향 기반의 탭메뉴

```javascript

//전역변수가 없다. 
//var $tabMenuItems = null;
//var $tab2MenuItems = null;

$(document).ready(function(){

    //탭메뉴 생성
    var tabMenu1 = new tabMenu1('#tabMenu1');
    var tabMenu2 = new tabMenu2('#TabMenu2');
});

// 탭메뉴 클래스
function TabMenu(selector){
    this.init(selector);
    this.initEvent();
}

// 탭메뉴 요소 초기화
TabMenu.prototype.init = function(selector){
    this.tabMenu = $(selector);
    this.$menuItems = this.tabMenu.find('li');
}

// 이벤트 초기화
TabMenu.prototype.initEvent = function(){
    var objThis = this;
    this.$menuItems.on('click',function(){
        objThis.setSelectMenuItemAt($(this).index());
    });
}

// n번째 탭메뉴 선택
TabMenu.prototype.setSelectMenuItemAt = function(index){
    this.$menuItems.removeClass('select');
    this.$menuItems.eq(index).addClass('select');
}

```

탭메뉴와 관련있는 기능과 데이터를 모두 TabMenu 라는 클래스에 묶여있으며,

이 클래스를 이용해 독립적으로 동작하는 탭메뉴 인스턴스를 만들어서 사용

"객체군 ! 이 기능을 처리하세요" 식으로 객체단위로 처리 -> 객체지향의 특징 : 분리와 위임



#### 예제04> 객체기반 탭메뉴에 리셋처리 기능추가. 

```javascript

//전역변수가 없다. 
//var $tabMenuItems = null;
//var $tab2MenuItems = null;

$(document).ready(function(){

    //탭메뉴 생성
    var tabMenu1 = new tabMenu1('#tabMenu1');
    var tabMenu2 = new tabMenu2('#TabMenu2');

    // *리셋기능추가
    $('#btnReset').click(function(){
        tabMenu1.resetTabMenu();
        tabMenu2.resetTabMenu();
    });
});

// 탭메뉴 클래스
function TabMenu(selector){
    this.init(selector);
    this.initEvent();
}

// 탭메뉴 요소 초기화
TabMenu.prototype.init = function(selector){
    this.tabMenu = $(selector);
    this.$menuItems = this.tabMenu.find('li');
}

// 이벤트 초기화
TabMenu.prototype.initEvent = function(){
    var objThis = this;
    this.$menuItems.on('click',function(){
        objThis.setSelectMenuItemAt($(this).index());
    });
}

// n번째 탭메뉴 선택
TabMenu.prototype.setSelectMenuItemAt = function(index){
    this.$menuItems.removeClass('select');
    this.$menuItems.eq(index).addClass('select');
}

// *리셋기능추가
TabMenu.prototype.resetTabMenu = function(){
    this.$menuItems.removeClass('select');
}
```



### 객체지향 프로그래밍의 장점

- 프로젝트를 독립적인 객체 단위로 분리해서 사용해서 작업하기 때문에 여러 개발자와 협업해 규몬가 큰 프로젝트를 진행 할수 있다.
- 분리하여 사용하기 때문에 기능을 재사용 할 수 있다.



### 객체지향프로그래밍 VS 클래스 기반 프로그래밍

- 객체지향에서는 네가지 특징(추상화, 캡슐화, 다형성)
- 클래스 단위 프로그래밍은 위에 객체지향에서의 특징을 사용하지 않고 클래스만을 이용해 코딩하는 방식 - 문법만 사용하고 절차지향처럼 코딩할수도 있다.



## 03_절차지향 프로그래밍 VS 객체지향 프로그래밍

- 간단한 테스트나 프로젝트를 진행하기 위해 함수기반 절차지향방식으로 하면 쉽게 해결할수 있는 작업도 있다.
- 필요에 따라 두가지 방식 중 하나를 선택해서 사용하면 된다.



| 구분   | 절차지향프로그래밍                        | 객체지향프로그래밍                                |
| :--- | :------------------------------- | :--------------------------------------- |
| 처리방식 | 문제를 여러 개의 함수로 나눠 순차적으로 호출하는방식    | 문제를 여러개의 객체단위로 나눠 처리하는 방식.               |
| 단점   | 오래전 방식이며 협업해서 진행하는 큰 프로젝트에 맞지 않음 | 학습 난이도가 높음. 개발자의 활용능력이 무엇보다 중요           |
| 장점   | 간단한 프로젝트에 용이함. 비교적 배우기 쉬움        | 요즘 가장 많이 사용하는 방식. 협업해서 진행하는 큰 프로젝트에 적합함. |



# L02_객체지향 프로그래밍의 특징

## 객체지향 프로그래밍 이란?

- 프로그래밍을 유지보수 하기 쉽고 냄새나지 않은 먼진 코드를 만들수 있을까 수없이 노력한 끝에 완성한 최상의 결과물
- 위대한 프로그램의 특징은?



### 객체지향 프로그래밍의 4가지 특징

#### 추상화(Abstraction)

- 설계하는 작업
- 프로퍼티와 메서드의 이름을 작성하는 선언 부분만 만들뿐 구현X
- 연관문법 : 클래스, 추상클래스, 인터페이스 

####캡슐화(Encapsulation)

- 추상화 작업내용중 어떤 프로퍼티와 메서드는 외부에서 접근가능하고 또 어떤 프로퍼티와 메서드는 외부에서 접근하지 못하게 해야하는 경우 - 이 작업을 캡슐화 라고 한다.

#### 상속(Inheritance)

- 특정클래스(부모클래스)의 속성과 메서드를 하위(자식) 클래스가 물려받는것을 의미한다.

#### 다형성(Polymorphism)

- 객체지향 프로그래밍의 핵심
- 다형성을 이용하면 선언부분과 구현부분을 나눠 다양하게 처리
- 연관문법 : 상속, 인터페이스, 추상클래스, 합성

## 객체지향 프로그래밍 언어란?

- 객체지향 프로그래밍은 일종의 방법론일뿐
- 이렇게 코딩하면 유지보수하기 쉬운 코드를 만들수 있다.! 와 같은 내용이 담긴 문서 



## 자바스크립트는 객체지향 프로그래밍 언어인가요?

- 아니다.
- 객체지향언어의 특징 4가지를 모두 지원하지 않는다.
- 앞으로 자바스크립트에서는 과연 객체지향개념을 어떻게 지원하고 사용할 수 있는지 자세히 알아보자 -> 자바스크립트로 표현하고 사용할수 있는 객체지향 개념을 예시로 하나하나 짚어본다.



## 객체지향 프로그래밍 언어에서 제공하는 기본기능

- 클래스
- 인터페이스
- 추상클래스



### 선언부분과 구현부분

- 선언부분 : 메서드 이름은 뭐고 매개변수를 몇개 등의 메서드 정보 - 일종의 규칙, 가이드생성-설계
- 구현부분에서는 선언부분에 작성되어 있는 메서드 이름과 매개변수를 똑같이 만들어 구현해야한다.
- 구현부분 : 말 그대로 선언부분에 있는 메서드의 기능을 직접 구현한 코드



#### 선언부분과 구현부분을 나눠서 구현하는이유?

- 객체지향의 핵심 다형성 떄문이다.
- 다형성을 적용해 코드를 만들게 되면 특정 작업을 소스수정을 거의하지 않고 다양한 방법으로 연결해서 만들 수 있다. 



## 클래스

그동안 알았으니 패쓰 책보자.



## 인터페이스

-  구현부분엇이 오직 선언부분만을 만들 때 사용하는 문법
- JS는 지원하지 않기 때문에 자바를 예시로 살펴보자.



## 추상클래스

- 상속의 개념과 연결됨.
- 자식클래스에게 구현하도록 강요해야하는 경우가 발생 -> 추상클래스 사용 
- JS는 지원하지 않기 때문에 자바를 예시로 살펴보자.

[자바정리한것]: https://github.com/jewdri-kim/OOAD/blob/master/99_java/5%EC%9E%A5%20%EA%B0%9D%EC%B2%B4%EC%A7%80%ED%96%A5%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D.md

자바정리한것

https://github.com/jewdri-kim/OOAD/blob/master/99_java/5%EC%9E%A5%20%EA%B0%9D%EC%B2%B4%EC%A7%80%ED%96%A5%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D.md

## UML

OOAD 예시로 보기

