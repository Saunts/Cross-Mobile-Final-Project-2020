export interface quiz{
    questionType: number;
    questionText: string;
    provinsi: string;

    truefalseAnswer?: boolean;

    susunAnswer?: string;
    susunChoice?: string;

    pgAnswer?:string;
    pgChoice?: [string, string, string, string];
}