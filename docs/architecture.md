# NodeGoat DevSecOps Architecture

## System Architecture

```mermaid
flowchart TB
    User["User / Web Browser"]

    subgraph Docker["Docker Environment - Trust Boundary"]
        subgraph Network["Docker Network"]
            Web["NodeGoat Web Container<br/>Node.js + Express<br/>Port 4000"]
            Mongo["MongoDB Container<br/>MongoDB 4.4<br/>Port 27017<br/>Database: nodegoat"]

            Web -->|"MongoDB communication - Port 27017"| Mongo
        end
    end

    User -->|"HTTP request - Port 4000"| Web
