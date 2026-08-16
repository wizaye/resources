# Core CS Fundamentals
 
This is the stage that separates people who can code from people who understand what their code runs on. Interviewers use this round to check if you understand systems, not definitions. Don't answer with textbook lines, answer with how the thing actually behaves.
 
> [!TIP]
> For every algorithm or mechanism in this section, implement it, don't just describe it. "I know Round Robin" and "I've written Round Robin scheduling in code" are different candidates in an interviewer's eyes.
 
Four subjects here, each with its own detail file. This page only tells you what to focus on and why. The full explanations, diagrams, and code live in the linked files.
 
---
 
## Operating Systems

[Open Operating Systems notes →](./operating-systems.md)
 
Why it's asked: almost everything you write eventually runs through the OS, threads, memory, scheduling. Interviewers use this to check whether you understand what's happening underneath your code, not just the code itself.
 
Focus on:
- Threads (OS-level vs programming-level) and thread lifecycle
- Context switching, and how Linux vs Windows differ
- Critical section problems (mutex vs semaphore)
- Memory management (paging, segmentation, fragmentation)
- Scheduling and page replacement algorithms
- Deadlocks, four conditions and four ways to handle them
- Virtual memory and thrashing
---
 
## Computer Networks

[Open Computer Networks notes →](./computer-networks.md)
 
Why it's asked: every system you'll ever design talks to another system over a network. This round checks if you understand what actually happens between a request and a response, not just that "HTTP exists."
 
Focus on:
- OSI model, one protocol and one security risk per layer
- TCP vs UDP, and when each is the right call
- Encapsulation and decapsulation across layers
---
 
## DBMS

[Open DBMS notes →](./dbms.md)
 
Why it's asked: most PBCs won't ask you to write live SQL. But database-heavy companies (Oracle, Databricks, Snowflake) go deep here, and even generalist interviews test whether you understand trade-offs in how data is stored and accessed.
 
Focus on:
- SQL vs NoSQL, when to use which
- CAP theorem, and what it actually means during a network partition
- Replication vs partitioning, they solve different problems
- Backups and efficient querying (indexing trade-offs)
---
 
## Object-Oriented Programming

[Open Object-Oriented Programming notes →](./object-oriented-programming.md)
 
Why it's asked: this is the foundation LLD interviews are built on. If your OOP fundamentals are shaky, LLD rounds fall apart regardless of how many design patterns you've memorized.
 
Focus on:
- UML and ER diagrams, you'll need to draw these later in LLD
- The four pillars, understood through your own code, not analogies
- Picking Java or C# over Python while learning this, so the language doesn't let you skip the concepts
---
 
## Where This Feeds Into
 
- ER diagrams and UML from OOP directly feed into Low-Level Design.
- CAP theorem, replication, and partitioning directly feed into High-Level Design.
- Everything here is fair game as rapid-fire follow-up questions during DSA rounds too, don't treat this as a separate silo from coding rounds
