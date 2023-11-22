import "./style/main.css";
import "./ui";
import { capacity, pricing } from "./data";
import { Capacity, Pricing } from "./types";
import { createCar } from "./functions";
import { Car } from "./classes";

const imgElements: NodeListOf<HTMLImageElement> = document.querySelectorAll("img")!;
const park: NodeListOf<HTMLDivElement> = document.querySelectorAll(".park")!;
const titleParking: HTMLHeadElement = document.querySelector("h1")!;
const enterCarTime: NodeListOf<HTMLDivElement> = document.querySelectorAll(".text")!;
const logImg: NodeListOf<HTMLDivElement> = document.querySelectorAll(".pointer")!;

class Parking<T extends Car> {
	public cars: T[] = [];
	public profit: number = 0;
	private id = 1;
	constructor(public name: string, public capacity: Capacity, public pricing: Pricing) {}

	enterCar(car: T) {
		const isAreaExist = this.capacity[car.type] !== 0;
		if (!isAreaExist) {
			// alert("Parking is full ❌");
		}

		this.capacity[car.type]--;
		car.setId(`${this.id++}`);

		const enterTime = new Date();
		car.setEnterTime(enterTime);

		this.cars.push(car);

		let formattedEnterTime = `${enterTime.getHours()}:${enterTime.getMinutes()}:${enterTime.getSeconds()}`;
		return `${car.name} entered at ${formattedEnterTime}`;
	}

	logoutCar(carId: string) {
		const carIdx = this.cars.findIndex((c) => c.getId() === carId);
		if (carIdx === -1) throw new Error(`Car not entered with id ${carId}`);

		const car = this.cars[carIdx];
		const profitOfThisCar = this.calculateProfitThisCar(car);
		this.profit += profitOfThisCar;

		this.capacity[car.type]++;
		this.cars.splice(carIdx, 1);
		return profitOfThisCar;
	}

	calculateProfitThisCar(car: T) {
		const diff = new Date().getSeconds() - car.getEnterTime().getSeconds();
		console.log(`${diff}-second`);
		const priceOfPerSecond: number = this.pricing.PETROL_CAR;
		const total = diff * priceOfPerSecond;
		console.log(`${total}-$`);

		return total;
	}

	calculateTotalProfit() {
		return this.profit;
	}
}

const parking = new Parking("Sebzor Parking", capacity, pricing);
let countCar = 0;
park.forEach((e, idx) => {
	const carName = imgElements[idx].alt.valueOf();
	const car = createCar(carName);
	const enterTime = parking.enterCar(car);
	e.addEventListener("click", () => {
		enterCarTime[idx].innerText = enterTime;
		const value = imgElements[idx].src.valueOf();
		imgElements[idx].remove();
		e.innerHTML = `<img class="pointer" src="${value}" alt=""/>`;
		countCar++;
		// e.style.pointerEvents = "none";
		if (countCar === 6) {
			titleParking.innerText = "PARKING IS FULL ❌";
			titleParking.style.color = "red";
			titleParking.style.fontSize = "30px";
		}

		setTimeout(() => {
			parking.logoutCar(car.getId());
		}, 2000);
		console.log(car);
	});
});

logImg.forEach((logCar) => {
	logCar.addEventListener("click", () => {
		console.log("logged");
	});
});
