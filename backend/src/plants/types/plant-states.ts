/**
 * Custom type for watering information
 */
export type Watering = {
    readonly period: string;
    readonly basedTemperature: string;
};

/**
 * Custom type for sunlight information
 */
export type Sunlight = {
    readonly type: string;
    readonly duration: string;
};

/**
 * Custom type for flowering information
 */
export type Flowering = {
    readonly hasFlowering: boolean;
    readonly season: string;
};

/**
 * Custom type for trimming information
 */
export type Trimming = {
    readonly count: number;
    readonly months: string[];
};

/**
 * Custom type for plant state tracking
 */
export type PlantState = {
    readonly wasWatered: boolean;
    readonly gotSunlight: boolean;
    readonly wasTrimmed: boolean;
};
