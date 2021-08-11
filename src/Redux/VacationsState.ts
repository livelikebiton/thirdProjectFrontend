import VacationModel from "../Models/VacationModel";

export class VacationsState {
    public vacations: VacationModel[] = [];
}

export enum vacationsActionType {
    VacationsDownloaded = "VacationsDownloaded",
    VacationAdded = "VacationAdded",
    VacationUpdated = "VacationUpdated",
    FollowUpdated = "FollowUpdated",
    VacationDeleted = "VacationDeleted"
}

export interface VacationsAction {
    type: vacationsActionType;
    payload?: any;
}

export function vacationsDownloadedAction(vacations: VacationModel[]): VacationsAction {
    return { type: vacationsActionType.VacationsDownloaded, payload: vacations };
}

export function vacationsAddedAction(addedVacations: VacationModel[]): VacationsAction {
    return { type: vacationsActionType.VacationAdded, payload: addedVacations };
}

export function vacationUpdatedAction(updatedVacation: VacationModel): VacationsAction {
    return { type: vacationsActionType.VacationUpdated, payload: updatedVacation };
}

export function followUpdatedAction(vacationId: number, isFollowing: boolean): VacationsAction {
    return { type: vacationsActionType.FollowUpdated, payload: {vacationId, isFollowing} };
}
export function vacationDeletedAction(id: number): VacationsAction {
    return { type: vacationsActionType.VacationDeleted, payload: id };
}

export function vacationsReducer(currentState: VacationsState = new VacationsState(), action: VacationsAction): VacationsState {

    const newState = { ...currentState };

    switch (action.type) {
        case vacationsActionType.VacationsDownloaded:
            newState.vacations = action.payload;
            break;

        case vacationsActionType.VacationAdded:
            newState.vacations = newState.vacations.concat(action.payload);
            break;

        case vacationsActionType.VacationUpdated:
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            newState.vacations = newState.vacations.slice();
            newState.vacations[indexToUpdate] = action.payload;
            break;

        case vacationsActionType.FollowUpdated:
            const indexUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            newState.vacations = newState.vacations.slice();
            newState.vacations[indexUpdate].isFollowing = action.payload.isFollowing;
            break;

        case vacationsActionType.VacationDeleted:
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId  === action.payload);
            newState.vacations = newState.vacations.slice();
            newState.vacations.splice(indexToDelete, 1);
            break;
    }

    return newState;

}