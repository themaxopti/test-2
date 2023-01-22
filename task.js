function delay(amount) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(amount)
        }, amount)
    })
}

class Dealer {
    #title
    #vehicles = []

    constructor(title) {
        this.#title = title
    }

    get vehicles() {
        return this.#vehicles
    }

    set vehicles(value) {
        this.#vehicles = value
    }

    get title() {
        return this.#title
    }

    set title(value) {
        this.#title = value
    }

    async addVehicle(vehicle) {
        try {
            await delay(1500)
            if (!vehicle instanceof Vehicle) {
                throw new Error('It is not a vehicle')
            }
            const isExisting = this.#vehicles.find(el => el.vin === vehicle.vin)
            if (isExisting) {
                // console.log('here');
                throw new Error('This car is already here')
            }
            this.#vehicles.push(vehicle)
        } catch (e) {
            console.log(e);
        }
    }
    async sellVehicle(vin) {
        try {
            await delay(1500)

            const foundVehicle = this.#vehicles.find(el => el.vin === vin)
            if (!foundVehicle) {
                throw new Error('This car does not exist')
            }
            const foundVehicleIndex = this.#vehicles.indexOf(foundVehicle)
            this.#vehicles.splice(foundVehicleIndex, 1)
            console.log(`Truck with VIN=${vin} is sold successfully`);
        } catch (e) {
            console.log(e);
        }
    }
    async findTruck(carryWeight, color) {
        try {
            await delay(1500)

            const foundTruck = this.#vehicles.find(el => el.carryWeight === carryWeight
                && el.color === color)
            if (!foundTruck) {
                throw new Error('This track does not exist')
            }
            return foundTruck

        } catch (e) {
            console.log(e);
        }
    }
    async paintBus(vin, color) {
        try {
            await delay(3000)

            const foundBus = this.#vehicles.find(el => el.vin === vin)
            if (!foundBus) {
                throw new Error('This bas does not exist')
            }
            foundBus.color = color
        } catch (e) {
            console.log(e);
        }

    }
    async countVehiclesWithColor(color) {
        try {
            const vehiclesWithColors = this.#vehicles.filter(el => el.color === color)
            return vehiclesWithColors.length
        } catch (e) {
            console.log(e);
        }
    }
}

class Vehicle {
    #vin
    #color

    constructor(vin, color) {
        this.#vin = vin
        this.#color = color
    }

    get vin() {
        return this.#vin
    }
    get color() {
        return this.#color
    }
    set color(value) {
        this.#color = value
    }
}

class Truck extends Vehicle {
    #carryWeight
    constructor(vin, color, carryWeight) {
        super(vin, color)
        this.#carryWeight = carryWeight
    }

    get carryWeight() {
        return this.#carryWeight
    }
}

class Bus extends Vehicle {
    #maxPassengers
    constructor(vin, color, maxPassengers) {
        super(vin, color)
        this.#maxPassengers = maxPassengers
    }

    get maxPassengers() {
        return this.#maxPassengers
    }
}

const DATABASE = {
    dealer: {
        title: 'Trucks & Buses Vilnius LTD'
    },
    trucks: [
        {
            vin: 1113,
            color: 'Red',
            carryWeight: 10
        },
        {
            vin: 2332,
            color: 'Yellow',
            carryWeight: 20
        },
        {
            vin: 5234,
            color: 'Green',
            carryWeight: 70
        }
    ],
    buses: [
        {
            vin: 1112,
            color: 'Green',
            maxPassengers: 50
        },
        {
            vin: 6543,
            color: 'Yellow',
            maxPassengers: 25
        }
    ]
}

const dealer = new Dealer('Trucks & Buses Vilnius LTD')



async function testing() {
    DATABASE.buses.forEach(async (el) => {
        const bus = new Bus(el.vin, el.color, el.maxPassengers)
        await dealer.addVehicle(bus)
    })


    DATABASE.trucks.forEach(async (el) => {
        const track = new Truck(el.vin, el.color, el.carryWeight)
        await dealer.addVehicle(track)
    })

    const foundTrack = await dealer.findTruck(10, 'Red')
    console.log(foundTrack);
    await dealer.sellVehicle(foundTrack.vin)
    console.log(dealer.vehicles);
    const greenCars = await dealer.countVehiclesWithColor('Green')
    console.log(greenCars);
    await dealer.paintBus(1112, 'Yellow')
    console.log(dealer.vehicles);
    const yellowCarsAmount = await dealer.countVehiclesWithColor('Yellow')
    console.log(yellowCarsAmount);
    await dealer.addVehicle(new Truck(4321, 'Yellow', 100))
    const yellowCarsAmount2 = await dealer.countVehiclesWithColor('Yellow')
    console.log(yellowCarsAmount2);

}

testing()
