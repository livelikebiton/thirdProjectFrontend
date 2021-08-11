class VacationModel {
    public vacationId: number;
    public destination: string;
    public dateFrom: Date;
    public dateTo: Date;
    public vacationPrice: number;
    public description: string;
    public imageName: string;
    public image: FileList;
    public isFollowing: number;
    public follows: number;

    public static convertToFormData(vacation: VacationModel): FormData {
        const myFormData = new FormData();
        myFormData.append("destination", vacation.destination);
        myFormData.append("dateFrom", vacation.dateFrom.toString());
        myFormData.append("dateTo", vacation.dateTo.toString());
        myFormData.append("vacationPrice", vacation.vacationPrice.toString());
        myFormData.append("description", vacation.description);
        myFormData.append("image", vacation.image.item(0) as Blob);
        return myFormData;
    }
}

export default VacationModel;