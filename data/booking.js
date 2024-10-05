export const reservationData = [
    {
        date: '2024-10-27T00:00',
        docks: [
            {
                name: 'Dock 1',
                dockReservations: [
                    { id: 'ab', start: '2024-10-27T09:00', end: '2024-10-27T10:30' }, // 1.5 hours
                    { id: 'ak', start: '2024-10-27T12:00', end: '2024-10-27T14:30' }, // 2.5 hours
                    { id: 'a6', start: '2024-10-27T16:00', end: '2024-10-27T17:00' }  // 1 hour
                ]
            },
            {
                name: 'Dock 2',
                dockReservations: [
                    { id: 'ba', start: '2024-10-27T08:00', end: '2024-10-27T09:30' }, // 1.5 hours
                    { id: 'b', start: '2024-10-27T11:00', end: '2024-10-27T13:30' }, // 2.5 hours
                    { id: 'bc', start: '2024-10-27T15:00', end: '2024-10-27T16:00' }  // 1 hour
                ]
            },
            {
                name: 'Dock 3',
                dockReservations: [
                    { id: 'aasc', start: '2024-10-27T07:30', end: '2024-10-27T08:30' }, // 1 hour
                    { id: 'aghc', start: '2024-10-27T09:30', end: '2024-10-27T12:00' }, // 2.5 hours
                    { id: 'akjc', start: '2024-10-27T13:00', end: '2024-10-27T14:30' }  // 1.5 hours
                ]
            },
            {
                name: 'Dock 4',
                dockReservations: [
                    { id: 'aertc', start: '2024-10-27T08:00', end: '2024-10-27T09:00' }, // 1 hour
                    { id: 'alklc', start: '2024-10-27T10:00', end: '2024-10-27T12:30' }, // 2.5 hours
                    { id: 'acbcbc', start: '2024-10-27T14:00', end: '2024-10-27T15:30' }  // 1.5 hours
                ]
            }
        ]
    },
    {
        date: '2024-10-28T00:00',
        docks: [
            {
                name: 'Dock 1',
                dockReservations: [
                    { id: 'ba', start: '2024-10-28T08:00', end: '2024-10-28T09:30' }, // 1.5 hours
                    { id: 'b', start: '2024-10-28T11:00', end: '2024-10-28T13:30' }, // 2.5 hours
                    { id: 'bc', start: '2024-10-28T15:00', end: '2024-10-28T16:00' }  // 1 hour
                ]
            },
            {
                name: 'Dock 2',
                dockReservations: [
                    { id: 'ab', start: '2024-10-28T09:00', end: '2024-10-28T10:30' }, // 1.5 hours
                    { id: 'ak', start: '2024-10-28T12:00', end: '2024-10-28T14:30' }, // 2.5 hours
                    { id: 'a6', start: '2024-10-28T16:00', end: '2024-10-28T17:00' }  // 1 hour
                ]
            },
            {
                name: 'Dock 3',
                dockReservations: [
                    { id: 'aertc', start: '2024-10-28T08:00', end: '2024-10-28T09:00' }, // 1 hour
                    { id: 'alklc', start: '2024-10-28T10:00', end: '2024-10-28T12:30' }, // 2.5 hours
                    { id: 'acbcbc', start: '2024-10-28T14:00', end: '2024-10-28T15:30' }  // 1.5 hours
                ]
            },
            {
                name: 'Dock 4',
                dockReservations: [
                    { id: 'aasc', start: '2024-10-28T07:30', end: '2024-10-28T08:30' }, // 1 hour
                    { id: 'aghc', start: '2024-10-28T09:30', end: '2024-10-28T12:00' }, // 2.5 hours
                    { id: 'akjc', start: '2024-10-28T13:00', end: '2024-10-28T14:30' }  // 1.5 hours
                ]
            }
        ]
    },

]

export const modifiedReservationData = [
    {
        bookingDate: "2024-10-26T18:00:00.000Z", //convert to local dateTime
        docks: {
            dock1: [
                {
                    bookingId: "66fd2f0689742860523dc9b3",
                    user: "66f4f50bb27149e918b9b91c",
                    name: "Md. Ahsanul Kabir",
                    materialType: "REF Parts",
                    containerSize: 40,
                    loadedWithPallete: false,
                    startTime: "2024-10-27T02:00:00.000Z", //convert to local dateTime
                    endTime: "2024-10-27T04:00:00.000Z", //convert to local dateTime
                    createdAt: "2024-10-02T11:31:18.990Z", //convert to local dateTime
                    updatedAt: "2024-10-02T11:31:18.990Z", //convert to local dateTime
                }
            ]
        }
    }
]