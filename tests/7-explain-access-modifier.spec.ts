import { test } from "@playwright/test";
class A {

    constructor(text: string) {

    }

    protected a = "a";
    private b = "b";
    public c = "c";

    public test1() {
        console.log(this.a)
        console.log(this.b)
        console.log(this.c)
    }

    public test3() {
        console.log("Hello")
    }
}

class B extends A {

    constructor(text: string, num: number) {
        super(text)
    }

    public test2() {
        console.log(this.a)
        // console.log(this.b)
        console.log(this.c)
    }

    public test3() {
        console.log("World")
    }
}

class C extends B {

    public test3() {
        console.log("Jojoe")
    }
}

test("test class", async () => {
    const objectB = new B('', 0);
    // console.log(objectB.c)
    // console.log(objectB.test1())
    // console.log(objectB.test2())
    objectB.test3()

    const objC = new C('', 0);
    objC.test3()
});