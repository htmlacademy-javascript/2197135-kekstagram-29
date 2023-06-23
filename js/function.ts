const getFunction = (timeDayStart:string, timeDayFinish:string, timeMeetingStart:string, meetingDuration:number) => {
	const timeToMinutes = (time:string) => {
		const timeArray = time.split(':');
		const hours = parseInt(timeArray[0],10);
		const minutes = parseInt(timeArray[1],10);
		return hours * 60 + minutes;
	};

	const startMinutes = timeToMinutes(timeDayStart);
	const endMinutes = timeToMinutes(timeDayFinish);
	const meetingStartMinutes = timeToMinutes(timeMeetingStart);
	const meetingEndMinutes = meetingStartMinutes + meetingDuration;

	if (meetingEndMinutes <= endMinutes && meetingStartMinutes >= startMinutes) {
		return true;
	} else {
		return false;
	}
};
