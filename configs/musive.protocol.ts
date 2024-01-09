export const MusiveProtocol = {
    published: true,
    protocol: 'https://github.com/riush03/musive/protocols/musive',
    types: {
      name: {
        schema: 'https://github.com/riush03/musive/schemas/name',
      },
      photo: {
        schema: 'https://github.com/riush03/musive/schemas/userphoto',
        dataFormats: ['image/png', 'jpeg', 'gif'],
      },
      profile: {
        schema: 'https://github.com/riush03/musive/schemas/userprofile',
        dataFormats: ['application/json'],
      },
      songs: {
        schema: 'https://github.com/riush03/musive/schemas/songs',
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
  