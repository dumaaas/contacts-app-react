// fake data for contact
// contact fields are name, email, phone, isFavorite and label
// isFavorite field is boolean and we used it so we can know if we added contact in favorite list or not
// label field is string and we used it so we can know in which label list is our contact
export const ContactsData = [
    {
        name: "Marko Dumnic",
        email: "markodumnic8@gmail.com",
        phone: "+38268836393",
        isFavorite: true,
        label: 'Work'
    },
    {
        name: "Nemanja Pejakovic",
        email: "nemanja331@gmail.com",
        phone: "+38269628280",
        isFavorite: true,
        label: 'Family'
    },
    {
        name: "Milos Jovovic",
        email: "milosj@gmail.com",
        phone: "+38269571033",
        isFavorite: false,
        label: 'Friends'
    },
    {
        name: "Stefan Tomovic",
        email: "stefant331@gmail.com",
        phone: "+38267321451",
        isFavorite: false,
        label: 'Friends'
    },
]