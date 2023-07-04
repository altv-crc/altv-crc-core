<p align="center" style="font-size: 26px">
	<b>altv-crc core</b>
</p>
<p align="center">
	<sup>A TypeScript Cross Resource Reloader, Transpiler, and Reconnector</sup>
	<br />
	<sup>Spend more time coding, and less time restarting</sup>
</p>
<p align="center">
	<img src="https://i.imgur.com/QdU5BnP.png" width="350" title="hover text">
</p>

# Features

A simple Typescript Boilerplate that builds incredibly fast using the [SWC Library](https://github.com/swc-project/swc).

- Auto restart individual resources on file change.
- Auto build resources on file change.
- Flag individual resources for full reconnection.
- Compile multiple resources at once
- Auto reconnect on a Windows PC instantly
- Auto download latest alt:V Binaries on installation

# Installation

* [Install NodeJS 18+](https://nodejs.org/en/download/current/)
* [Install GIT](https://git-scm.com/downloads)

## Clone the Repository

Use the command below in any terminal, command prompt, etc.

```sh
git clone https://github.com/Stuyk/altv-typescript
```

## Install the Repository

Use the command below in any terminal, command prompt, etc.

```sh
cd altv-typescript
npm install
```

## Update / Download Server Files

If the binaries for the server did not download, you can always use this command to update.

```sh
npm run update
```

## Start Developer Server

Run this command to run the server in development mode.

This will automatically reconnect your alt:V Client if you have `debug` mode turned on.

This will also automatically rebuild and restart resources on file change.

```
npm run dev
```

## Start Production Server (Windows)

Run this command to run the server in production mode.

```
npm run windows
```

## Start Production Server (Linux)

Run this command to run the server in production mode.

```
npm run linux
```

# FAQ

## Where do I get resources?

Resources can be obtained from [https://github.com/altv-crc](https://github.com/altv-crc)

## End Server Runtime

Use the key combination `ctrl + c` to kill your server in your terminal, command prompt, etc.

## How to Add Mods, and New Resources

Always add your already compiled resources & mods into the `resources` folder.

## How to ignore specific resources from compiling

Add file name `.nocompile` to the resource folder you want to ignore from compiling.

## How to mark a resource as requiring a full reconnect?

Add a file called `reconnect.txt` to the base folder of the resource.


