const shellPid = +env.get("shell_pid");
const { UwUifyProcess } = await load("process.js");

await handler.spawn(UwUifyProcess, undefined, shellPid);
