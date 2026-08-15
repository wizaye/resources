# Java Cheat Sheet

Grouped by what you're actually trying to do, not by textbook chapter order. Everything targets standard Java (8+), compiles with `javac`.

## Getting Something Running

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");   // print with newline
        System.out.print("no newline here");   // print without one

        Scanner sc = new Scanner(System.in);   // read input
        String line = sc.nextLine();
    }
}
```

`import java.util.ArrayList;` pulls in a class you need. `// line` and `/* block */` are your two comment styles.

## Storing a Value

| Type | Holds |
|---|---|
| `int`, `long` | Whole numbers, 32-bit and 64-bit |
| `double`, `float` | Decimals |
| `boolean` | `true` / `false` |
| `char` | One character |
| `String` | Text, and it's a class, not a primitive |
| `var` | Let Java infer the type (Java 10+) |

```java
int x = 5;
var name = "Ada";                          // inferred as String
final double PI = 3.14159;                 // can't be reassigned
String s = "Hi " + name;                   // concatenation
int n = Integer.parseInt("42");            // string -> int
String s2 = String.valueOf(42);            // int -> string
String s3 = String.format("%d items", n);  // formatted
```

`Integer`, `Double`, `Boolean` are the object wrappers around the lowercase primitives, you need these when a generic type (`List<Integer>`, not `List<int>`) is involved.

## Making Decisions and Repeating Things

```java
if (x > 0) { ... } else { ... }

var s = switch (n) {
    case 1 -> "one";
    default -> "other";
};

for (int i = 0; i < n; i++) { ... }
for (String item : list) { ... }           // for-each
while (i < n) { ... }
do { ... } while (i < n);

break;      // exit the loop entirely
continue;   // skip to the next iteration
```

## Doing Math

| Call | Result |
|---|---|
| `Math.max(a, b)` / `Math.min(a, b)` | Larger / smaller |
| `Math.abs(x)` | Absolute value |
| `Math.pow(x, y)` | `x` to the power `y`, returns `double` |
| `Math.sqrt(x)` | Square root |
| `Math.round(x)`, `floor`, `ceil` | Round nearest / down / up |
| `Math.random()` | Random `double` in `[0.0, 1.0)` |
| `Integer.MAX_VALUE` / `MIN_VALUE` | The largest / smallest `int` |

Operators you'll use constantly: `+ - * / %` for arithmetic, `== !=` for equality (reference equality on objects), `&& || !` for short-circuit logic, `? :` for a one-line if/else (`x > 0 ? "pos" : "neg"`), `instanceof` for a type check.

## Working With Text

`String` is immutable, every method below returns a *new* string, nothing is modified in place.

```java
s.length()               // character count
s.charAt(i)               // character at index i
s.substring(a, b)         // slice, a inclusive, b exclusive
s.indexOf("x")             // first index, or -1
s.contains("x")            // true/false
s.replace("a", "b")        // replace all occurrences
s.split(",")                // -> String[]
s.trim()  /  s.strip()      // remove surrounding whitespace
s.toUpperCase()  /  toLowerCase()
s.equals(t)  /  equalsIgnoreCase(t)   // value comparison
s.startsWith("x")  /  endsWith("x")
String.join(",", list)      // join elements with a separator
```

> [!WARNING]
> Never compare two `String`s with `==`, that checks if they're the same object in memory, not whether they hold the same text. Always `.equals()`. This is the single most common Java bug for people coming from other languages.

Building a string across a loop? Don't use `+=` repeatedly, every concatenation builds a brand new string. Use `StringBuilder` instead.

## Packaging Logic Into Methods

```java
int add(int a, int b) { return a + b; }
void greet() { ... }                                 // no return value
static int square(int x) { return x * x; }
public String getName() { return name; }
int sum(int... nums) { ... }                          // varargs

int r = add(2, 3);                                     // calling it
Math.max(a, b);                                        // calling a static method
```

Method overloading, same name, different parameter types: `int max(int a, int b)` and `double max(double a, double b)` can coexist.

## Building Objects (OOP)

```java
public class Dog {
    private String name;

    public Dog(String name) { this.name = name; }
    public String getName() { return name; }
}

Dog d = new Dog("Rex");

class Puppy extends Dog { ... }                    // inheritance

interface Runnable { void run(); }
class Task implements Runnable {
    @Override
    public void run() { ... }
}
```

## Modern, Concise Java (14+)

Worth knowing these exist even before you use them daily, they show up constantly in newer codebases.

```java
record Point(int x, int y) {}          // immutable data carrier
var p = new Point(1, 2);
p.x();                                  // auto-generated accessor

enum Day { MON, TUE, WED }
enum Coin { PENNY(1), DIME(10); ... }   // enum with associated values

if (o instanceof String s) { s.length(); }   // pattern matching instanceof

// Switch pattern matching (Java 21)
case Integer i -> ...;
case String s -> ...;

sealed interface Shape permits Circle, Square {}   // restrict who can implement this
```

## Storing Groups of Data

| Type | Use |
|---|---|
| `ArrayList<T>` | Dynamic array: `list.add(1); list.get(0); list.size();` |
| `HashMap<K, V>` | Key-value: `map.put("a", 1); map.get("a");` |
| `HashSet<T>` | Unique values only: `set.add(5); set.contains(5);` |
| `LinkedList<T>` | Doubly linked, good as a queue or deque |
| `ArrayDeque<T>` | Stack/queue: `dq.push(x); dq.pop();` |
| `int[] nums = {1, 2, 3};` | Fixed-size array |

```java
for (T x : list) { ... }
for (var e : map.entrySet()) { e.getKey(); e.getValue(); }
```

## Processing a Collection, Functional Style

```java
list.stream()
    .filter(n -> n > 0)                      // keep matching elements
    .map(n -> n * 2)                          // transform each element
    .sorted()                                  // or Comparator.reverseOrder()
    .collect(Collectors.toList());

list.stream().reduce(0, Integer::sum);        // fold into a single value
list.stream().count();
list.stream().anyMatch(n -> n > 5);
list.forEach(System.out::println);
```

`x -> x * 2` is a lambda, a short-form anonymous function, that's what's driving every step above.

## When Things Go Wrong, and Generics

```java
try {
    ...
} catch (IOException e) {
    ...
} finally {
    ...              // always runs, even if an exception was thrown
}

try (Scanner sc = new Scanner(...)) { ... }   // auto-closes sc when done

throw new IllegalArgumentException("bad");

class Box<T> { T value; }                      // generic class
<T> T first(List<T> list) { ... }              // generic method
<T extends Number>                              // bounded generic type
```

---
*Back to [Cheatsheets](./README.md)*