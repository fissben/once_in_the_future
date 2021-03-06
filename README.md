### **Echo node.js service**

## Installation
  ``` bash  
  docker-compose up
  ```
  OR
  ``` bash
  cp .env.example .env
  #put correct local redis creds
  npm i

  ```
  
## Usage

  _Start server [only for manual start]_

  ```
   node app.js
  ```
  Server will be available at NODE_HOST:NODE_PORT

  For docker-compose start it's http://172.16.39.11:3000/
  
  Note: On macOS and Windows to reach service on http://localhost:3000, please add port forwarding to `node` section in ``docker-compose.yml``:
  ```yml
  #...
    node:
      container_name: echo_node
      tty: true
      restart: always
      build:
        context:
          ./docker/node
      expose:
      - "3000"
      #start  
      ports:
        - "3000:3000"
      #end
  #...  
  ```

## API
  
  **echoAtTime**
  ```
  GET /echoAtTime
  ```
  | Params  | Description |
  | ------------- | ------------- |
  | **time**  |  `<Number>` JavaScript timestamp (multiplied by 1000)  |
  | **message**  | `<String>` Message to send |
  
  http://172.16.39.11:3000/echoAtTime?time=1592236783521&message=hello%20world5
  
  ## Tests 
  ```
 docker exec -it echo_node npm test
  ```
  
  OR (for local run)
  ```
 npm test
```
  ## Potential todo 

1. Implement tests for Dispatcher
2. Refactor for scaling k8s 
    - 2 separated node processes one for saving data and second for dispatching
    - heath-check routes for predictable scaling (send traffic for services that already up and ready only)
3. More DDD (ideally with typescript)
4. Add integration tests
