interface blogPostInterface {
    id: number;
    date: string;
    content?: string;
    photo?: string;
    audio?: string;
}

const testBlogPosts: blogPostInterface[] = [
    {
        'id': 1,
        'date': '2012-04-23T18:25:43.511Z',
        'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'photo': '',
        'audio': ''
    },
    {
        'id': 2,
        'date': '2018-08-23T15:25:43.511Z',
        'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'photo': 'https://syki.pl/wp-content/uploads/2021/09/untitled9.png',
        'audio': ''
    },
    {
        'id': 3,
        'date': '2018-08-23T15:25:43.511Z',
        'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'photo': '',
        'audio': 'https://nagrywajfilmy.pl/wp-content/uploads/2021/04/porownanie.wav'
    },
    {
        'id': 4,
        'date': '2018-08-23T15:25:43.511Z',
        'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'photo': 'https://syki.pl/wp-content/uploads/2021/09/untitled9.png',
        'audio': 'https://nagrywajfilmy.pl/wp-content/uploads/2021/04/porownanie.wav'
    }
]

export default testBlogPosts;