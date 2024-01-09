export const MusiveProtocol = {
    published: true,
    protocol: 'https://dennotech.co.ke/protocols/musive',
    types: {
      name: {
        schema: 'https://dennotech.co.ke/schemas/name',
      },
      photo: {
        schema: 'https://dennotech.co.ke/schemas/userphoto',
        dataFormats: ['image/png', 'jpeg', 'gif'],
      },
      profile: {
        schema: 'https://dennotech.co.ke/schemas/userprofile',
        dataFormats: ['application/json'],
      },
      songs: {
        schema: 'https://dennotech.co.ke/schemas/songs',
        dataFormats: ['application/json','image/png', 'jpeg','audio/mp3'],
      },
    },
    structure: {
      name: {
        $actions: [
          {
            who: 'anyone',
            can: 'read',
          },
        ],
      },
      photo: {
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
      profile: {
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
  