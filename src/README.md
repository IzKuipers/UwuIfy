# UwUify

This application dynamically transforms all text in ArcOS to uwu'ified counterparts. It uses a MutationObserver and some Regex to accomplish this.

## Known problems

- There's no easy way to terminate the application, because it's a regular process, not an app. Either restart ArcOS or kill `UwuIfyProcess` using Process Manager.
- When the process does end, I can't guarantee that the process can reliably revert all uwuified strings back to their original states.

## License

MIT

## Authors

- Izaak Kuipers [izaak.kuipers@gmail.com](mailto:izaak.kuipers@gmail.com)
- Mistium [mist@mistium.com](mailto:mist@mistium.com)
