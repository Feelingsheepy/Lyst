import * as SocketIO from 'socket.io';

const port = parseInt(process.env.PORT) || 3000;
const server = new SocketIO.Server();
const services = new Map<string, string>();

server.on('connection', (socket) => {
  console.log(`connection received`);
  socket.emit("register", (serviceType: string) => {
    //Register service
    services.set(serviceType, socket.id);
    console.log(`${serviceType} registered - ${socket.id}`);

    socket.on("disconnect", () => {
      services.delete(serviceType);
      console.log(`${serviceType} disconnected`);
    });

    socket.on("message", (serviceType : string , method : string, body, callback : Function) => {
      if(services.has(serviceType)) {
        let service = server.sockets.sockets[services.get(serviceType)];
        service.emit(method, body, (response) => {
          console.log(`${serviceType} - ${method} : ${response}`);
          callback(response);
        });
      }
      else {
        callback(`No such service: ${serviceType}`);
      }
    })
  });
});

server.listen(port);
console.log(`test Listening on port ${port}`);