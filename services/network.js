const os = require("os");

exports.getNetworkIpAddress = () => {
  const netWorkInterfaces = os.networkInterfaces();

  const connectedNetworkInterfaces = Object.values(netWorkInterfaces)
    .flatMap((interface) => interface)
    .find((iface) => iface.family === "IPv4");
  if (connectedNetworkInterfaces) {
    return connectedNetworkInterfaces.address;
  } else {
    null;
  }
};
