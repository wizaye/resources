
# Object-Oriented Programming
 
## Before the Four Pillars
 
Learn UML first, especially ER diagrams, since you'll need to read and draw them in LLD rounds later. Then pick one OOP language and get the basics solid which generally includes :
- syntax
- conditions
- loops
- defining interfaces
- classes, and enums.

You can quickly read these to get started :
- [Introduction to the ER Model](https://www.geeksforgeeks.org/dbms/introduction-of-er-model)
- [Introduction to UML](https://www.geeksforgeeks.org/system-design/unified-modeling-language-uml-introduction)

> [!IMPORTANT]
> Prefer ==**Java or C#**== over **Python** for this. Both enforce OOP structure by design (explicit interfaces, access modifiers, strict typing), which makes the concepts concrete instead of optional. Python lets you skip half of this and still get away with it, which is exactly what you don't want while learning it.
 
## The Four Pillars
 
| Pillar        | What it actually means                                                     |
| ------------- | -------------------------------------------------------------------------- |
| Abstraction   | Expose what an object does, hide how it does it                            |
| Encapsulation | Bundle data and behavior together, control access to internal state        |
| Inheritance   | A class reuses and extends another class's behavior                        |
| Polymorphism  | The same interface behaves differently depending on the actual object type |
 
```java
// Abstraction + Polymorphism
interface Shape {
    double area();
}
 
class Circle implements Shape {
    double radius;
    public double area() { return Math.PI * radius * radius; }
}
 
class Rectangle implements Shape {
    double length, width;
    public double area() { return length * width; }
}
 
// Same call, different behavior depending on the actual object
Shape s = new Circle();
s.area();
```
 
> [!WARNING]
> Do not learn OOP through the generic real-life analogies floating around online ("a car is a class, a Toyota is an object"). They don't survive contact with an actual interview question. Instead, build one small project (a college ERP, an exam results portal, anything with real entities and relationships) and map the four pillars onto your own code. That's what actually sticks.
 
For more structured reading: [Introduction to OOP](https://www.geeksforgeeks.org/dsa/introduction-of-object-oriented-programming/)
 
---
*Back to [Core CS Fundamentals](./README.md)*