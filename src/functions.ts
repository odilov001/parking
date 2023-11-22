import { Car, BYD, KIA, Lexus, Tesla, Honda, Toyota, Jtour, Volkswagen } from "./classes";

export function createCar(carName: string): Car {
	switch (carName) {
		case "BYD":
			return new BYD(carName, 50000);
		case "KIA":
			return new KIA(carName, 60000);
		case "Lexus":
			return new Lexus(carName, 70000);
		case "Tesla":
			return new Tesla(carName, 85000);
		case "Honda":
			return new Honda(carName, 100000);
		case "Toyota":
			return new Toyota(carName, 1450000);
		case "Jtour":
			return new Jtour(carName, 65000);
		case "Volkswagen":
			return new Volkswagen(carName, 200000);
		default:
			throw new Error(`Unsupported car type: ${carName}`);
	}
}