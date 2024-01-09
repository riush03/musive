export const MusicProtocol = {
    published: true,
    protocol: 'https://dennotech.co.ke/protocols/music',
    types: {
      title: {
        schema: 'https://dennotech.co.ke/schemas/title',
        dataFormats: ['application/json'],
      },
      author: {
        schema: 'https://dennotech.co.ke/schemas/author',
        dataFormats: ['application/json'],
      },
      song: {
        schema: 'https://dennotech.co.ke/schemas/audio',
        dataFormats: ['audio/mp3'],
      },
      art: {
        schema: 'https://dennotech.co.ke/schemas/art',
        dataFormats: ['image/png', 'jpeg', 'gif'],
      },
      songs: {
        schema: 'https://dennotech.co.ke/schemas/songs',
        dataFormats: ['application/json'],
      },
    },
    structure: {
      title: {
        $actions: [
          {
            who: 'anyone',
            can: 'write',
          },
          {
            who: 'anyone',
            can: 'read',
          },
        ],
      },
      author: {
        $actions: [
          {
            who: 'anyone',
            can: 'write',
          },
          {
            who: 'anyone',
            can: 'read',
          },
        ],
      },
      audio: {
        $actions: [
          {
            who: 'anyone',
            can: 'write',
          },
          {
            who: 'anyone',
            can: 'read',
          },
        ],
      },
      art: {
        $actions: [
          {
            who: 'anyone',
            can: 'write',
          },
          {
            who: 'anyone',
            can: 'read',
          },
        ],
      },
      songs: {
        $actions: [
          {
            who: 'anyone',
            can: 'write',
          },
          {
            who: 'anyone',
            can: 'read',
          },
        ],
      },
    },
  };
  