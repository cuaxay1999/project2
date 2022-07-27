import { addDays, formatISO } from 'date-fns'

export const caculateDateTime = (dateC, time) => {
	if (dateC && time) {
		var dateNow = new Date(Date.now())
		var timeNow = `${dateNow.getHours()} : ${dateNow.getMinutes()} : ${dateNow.getSeconds()}`
		var dateConver = new Date(dateC)

		var dateData = `${dateConver.getMonth() + 1}/${dateConver.getDate()}/${dateConver.getFullYear()}`
		var dateNowIn = `${dateNow.getMonth() + 1}/${dateNow.getDate()}/${dateNow.getFullYear()}`

		if (dateNowIn > dateData) {
			return false
		}

		if (dateData === dateNowIn && timeNow >= time) {
			return false
		}
		return true
	}
}

export const addDate = (amount) => {
	return formatISO(addDays(new Date(Date.now()), amount))
}
