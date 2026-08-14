# Computer Networks
 
## OSI Model
 
```mermaid
flowchart TD
    A["7. Application — HTTP, DNS, FTP"] --> B["6. Presentation — encryption, compression"]
    B --> C["5. Session — session establishment, auth"]
    C --> D["4. Transport — TCP, UDP"]
    D --> E["3. Network — IP, routing"]
    E --> F["2. Data Link — MAC, switches"]
    F --> G["1. Physical — cables, signals"]
```
 
For each layer, know one real protocol and one real security risk at that layer. For example: Application layer runs HTTP, and is where SQL injection or XSS-style attacks live. Network layer runs IP, and is where IP spoofing lives. Interviewers ask this to check you understand the model isn't just theory, it maps to real vulnerabilities.
 
## TCP vs UDP
 
| | TCP | UDP |
|---|---|---|
| Connection | Connection-oriented (handshake) | Connectionless |
| Reliability | Guaranteed delivery, ordered | No guarantee |
| Speed | Slower, more overhead | Faster, minimal overhead |
| Use case | File transfer, web requests | Video calls, live streaming, DNS |
 
## Encapsulation Across Layers
 
```mermaid
flowchart LR
    A["Application Data"] --> B["+ Transport Header (TCP/UDP)"]
    B --> C["+ Network Header (IP)"]
    C --> D["+ Data Link Header (MAC)"]
    D --> E["Sent as bits"]
    E --> F["Receiver strips headers layer by layer, bottom to top"]
```
 
Know this happens in reverse on the receiving end, each layer strips its own header before passing data up. This is what "encapsulation and decapsulation" actually means, not just a term to recall.
 
---
*Back to [Core CS Fundamentals](./README.md)*