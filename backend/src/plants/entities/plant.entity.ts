import { randomUUID } from 'crypto';
import { plainToInstance } from 'class-transformer';
import { LowdbService } from '../../database/lowdb.service';
import { ResourceNotFoundException } from '../../exceptions/exceptions';
import { PlantCreationDto } from '../dto/plant-creation-dto';
import { PlantResponseDto } from '../dto/plant-response-dto';
import { PlantStateUpdateDto } from '../dto/plant-state-update-dto';
import { PlantSummaryDto } from '../dto/plant-summary-dto';

/**
 * Plant entity following MPS architecture
 * Contains all business logic and validations for plant management
 */
export class Plant {
    private static db: LowdbService;

    /**
     * Inject database dependency
     * @param db LowdbService instance
     */
    static injectDb(db: LowdbService): void {
        Plant.db = db;
    }

    private _id: string;
    private _createdAt: Date;
    private _chosenName: string;
    private _userId: string;
    private _commonName: string;
    private _scientificName: string;
    private _otherName?: string;
    private _family: string;
    private _type: string;
    private _cycle: string;
    private _wateringPeriod: string;
    private _wateringBasedTemperature: string;
    private _growthRate: string;
    private _careLevel: string;
    private _maintenance: string;
    private _sunlightType: string;
    private _sunlightDuration: string;
    private _floweringHasFlowering: boolean;
    private _floweringSeason: string;
    private _trimmingCount: number;
    private _trimmingMonths: string[];
    private _photoUrl?: string;
    private _wasWatered: boolean;
    private _gotSunlight: boolean;
    private _wasTrimmed: boolean;

    constructor(params: {
        id?: string;
        createdAt?: Date;
        chosenName: string;
        userId: string;
        commonName: string;
        scientificName: string;
        otherName?: string;
        family: string;
        type: string;
        cycle: string;
        wateringPeriod: string;
        wateringBasedTemperature: string;
        growthRate: string;
        careLevel: string;
        maintenance: string;
        sunlightType: string;
        sunlightDuration: string;
        floweringHasFlowering: boolean;
        floweringSeason: string;
        trimmingCount: number;
        trimmingMonths: string[];
        photoUrl?: string;
        wasWatered?: boolean;
        gotSunlight?: boolean;
        wasTrimmed?: boolean;
    }) {
        this._id = params.id ?? randomUUID();
        this._createdAt = params.createdAt ?? new Date();
        this._chosenName = params.chosenName;
        this._userId = params.userId;
        this._commonName = params.commonName;
        this._scientificName = params.scientificName;
        this._otherName = params.otherName;
        this._family = params.family;
        this._type = params.type;
        this._cycle = params.cycle;
        this._wateringPeriod = params.wateringPeriod;
        this._wateringBasedTemperature = params.wateringBasedTemperature;
        this._growthRate = params.growthRate;
        this._careLevel = params.careLevel;
        this._maintenance = params.maintenance;
        this._sunlightType = params.sunlightType;
        this._sunlightDuration = params.sunlightDuration;
        this._floweringHasFlowering = params.floweringHasFlowering;
        this._floweringSeason = params.floweringSeason;
        this._trimmingCount = params.trimmingCount;
        this._trimmingMonths = params.trimmingMonths;
        this._photoUrl = params.photoUrl;
        this._wasWatered = params.wasWatered ?? false;
        this._gotSunlight = params.gotSunlight ?? false;
        this._wasTrimmed = params.wasTrimmed ?? false;
    }

    /**
     * Find plant by ID
     * @param id Plant ID
     * @returns Plant response data
     * @throws ResourceNotFoundException if plant not found
     */
    public static findById(id: string): PlantResponseDto {
        const plant = Plant.db.data.plants.find((p) => p.id === id);

        if (!plant) {
            throw new ResourceNotFoundException('Plant', id);
        }


        return plainToInstance(PlantResponseDto, plant, {
            excludeExtraneousValues: true,
            enableImplicitConversion: true,
        });
    }

    /**
     * Create a new plant
     * @param dto Plant creation data
     * @returns Created plant as response DTO
     * @throws ResourceNotFoundException if user not found
     */
    public static create(dto: PlantCreationDto): PlantResponseDto {
        // Validate that user exists
        const userExists = Plant.db.data.users.some((u) => u.id === dto.userId);

        if (!userExists) {
            throw new ResourceNotFoundException('User', dto.userId);
        }

        const newPlant = new Plant({
            id: randomUUID(),
            createdAt: new Date(),
            chosenName: dto.chosenName,
            userId: dto.userId,
            commonName: dto.commonName,
            scientificName: dto.scientificName,
            otherName: dto.otherName,
            family: dto.family,
            type: dto.type,
            cycle: dto.cycle,
            wateringPeriod: dto.wateringPeriod,
            wateringBasedTemperature: dto.wateringBasedTemperature,
            growthRate: dto.growthRate,
            careLevel: dto.careLevel,
            maintenance: dto.maintenance,
            sunlightType: dto.sunlightType,
            sunlightDuration: dto.sunlightDuration,
            floweringHasFlowering: dto.floweringHasFlowering,
            floweringSeason: dto.floweringSeason,
            trimmingCount: dto.trimmingCount,
            trimmingMonths: [...dto.trimmingMonths],
            photoUrl: dto.photoUrl,
            wasWatered: false,
            gotSunlight: false,
            wasTrimmed: false,
        });

        const plantJson = newPlant.toJSON();

        Plant.db.data.plants.push(plantJson);
        Plant.db.write();

        return plainToInstance(PlantResponseDto, plantJson, {
            excludeExtraneousValues: true,
            enableImplicitConversion: true,
        });
    }

    /**
     * Find all plants by user ID
     * @param userId - User ID to search for
     * @returns Array of plant summaries
     * @throws ResourceNotFoundException if user not found
     */
    public static findAllByUser(userId: string): PlantSummaryDto[] {
        const userExists = Plant.db.data.users.some((u) => u.id === userId);
        if (!userExists) {
            throw new ResourceNotFoundException('User', userId);
        }

        const plants = Plant.db.data.plants.filter(plant => plant.userId === userId);
        return plainToInstance(PlantSummaryDto, plants);
    }

    /**
     * Update plant state
     * @param id Plant ID
     * @param dto Plant state update data
     * @returns Updated plant as response DTO
     * @throws ResourceNotFoundException if plant or user not found
     */
    public static updateState(id: string, dto: PlantStateUpdateDto): PlantResponseDto {
        const plantIndex = Plant.db.data.plants.findIndex((p) => p.id === id);

        if (plantIndex === -1) {
            throw new ResourceNotFoundException('Plant', id);
        }

        const plant = Plant.db.data.plants[plantIndex];

        // Validate that user exists
        const userExists = Plant.db.data.users.some((u) => u.id === plant.userId);

        if (!userExists) {
            throw new ResourceNotFoundException('User', plant.userId);
        }

        plant.wasWatered = dto.wasWatered;
        plant.gotSunlight = dto.gotSunlight;
        plant.wasTrimmed = dto.wasTrimmed;

        Plant.db.data.plants[plantIndex] = plant;
        Plant.db.write();

        return plainToInstance(PlantResponseDto, plant);
    }

    /**
     * Delete plant
     * @param id Plant ID
     * @throws ResourceNotFoundException if plant not found
     */
    public static delete(id: string): void {
        const plantIndex = Plant.db.data.plants.findIndex((p) => p.id === id);

        if (plantIndex === -1) {
            throw new ResourceNotFoundException('Plant', id);
        }

        Plant.db.data.plants.splice(plantIndex, 1);
        Plant.db.write();
    }


    // Getters
    get id(): string {
        return this._id;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get chosenName(): string {
        return this._chosenName;
    }

    get userId(): string {
        return this._userId;
    }

    get commonName(): string {
        return this._commonName;
    }

    get scientificName(): string {
        return this._scientificName;
    }

    get otherName(): string | undefined {
        return this._otherName;
    }

    get family(): string {
        return this._family;
    }

    get type(): string {
        return this._type;
    }

    get cycle(): string {
        return this._cycle;
    }

    get wateringPeriod(): string {
        return this._wateringPeriod;
    }

    get wateringBasedTemperature(): string {
        return this._wateringBasedTemperature;
    }

    get growthRate(): string {
        return this._growthRate;
    }

    get careLevel(): string {
        return this._careLevel;
    }

    get maintenance(): string {
        return this._maintenance;
    }

    get sunlightType(): string {
        return this._sunlightType;
    }

    get sunlightDuration(): string {
        return this._sunlightDuration;
    }

    get floweringHasFlowering(): boolean {
        return this._floweringHasFlowering;
    }

    get floweringSeason(): string {
        return this._floweringSeason;
    }

    get trimmingCount(): number {
        return this._trimmingCount;
    }

    get trimmingMonths(): string[] {
        return this._trimmingMonths;
    }

    get photoUrl(): string | undefined {
        return this._photoUrl;
    }

    get wasWatered(): boolean {
        return this._wasWatered;
    }

    get gotSunlight(): boolean {
        return this._gotSunlight;
    }

    get wasTrimmed(): boolean {
        return this._wasTrimmed;
    }

    // toJSON for database serialization
    toJSON(): {
        id: string;
        createdAt: Date;
        chosenName: string;
        userId: string;
        commonName: string;
        scientificName: string;
        otherName?: string;
        family: string;
        type: string;
        cycle: string;
        wateringPeriod: string;
        wateringBasedTemperature: string;
        growthRate: string;
        careLevel: string;
        maintenance: string;
        sunlightType: string;
        sunlightDuration: string;
        floweringHasFlowering: boolean;
        floweringSeason: string;
        trimmingCount: number;
        trimmingMonths: string[];
        photoUrl?: string;
        wasWatered: boolean;
        gotSunlight: boolean;
        wasTrimmed: boolean;
    } {
        return {
            id: this._id,
            createdAt: this._createdAt,
            chosenName: this._chosenName,
            userId: this._userId,
            commonName: this._commonName,
            scientificName: this._scientificName,
            otherName: this._otherName,
            family: this._family,
            type: this._type,
            cycle: this._cycle,
            wateringPeriod: this._wateringPeriod,
            wateringBasedTemperature: this._wateringBasedTemperature,
            growthRate: this._growthRate,
            careLevel: this._careLevel,
            maintenance: this._maintenance,
            sunlightType: this._sunlightType,
            sunlightDuration: this._sunlightDuration,
            floweringHasFlowering: this._floweringHasFlowering,
            floweringSeason: this._floweringSeason,
            trimmingCount: this._trimmingCount,
            trimmingMonths: this._trimmingMonths,
            photoUrl: this._photoUrl,
            wasWatered: this._wasWatered,
            gotSunlight: this._gotSunlight,
            wasTrimmed: this._wasTrimmed,
        };
    }
}
