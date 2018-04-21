export class Data {
  constructor(
    public readings: {
      solarVolts: number,
      powerVolts: number,
      loadCurrent: number,
      genHighVolts: number,
      genLowVolts: number
    }
  ) {}
}
