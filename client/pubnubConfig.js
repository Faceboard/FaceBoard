global.phone = PHONE({
  number: global.localStorage.username,
  publish_key: 'pub-c-561a7378-fa06-4c50-a331-5c0056d0163c',
  subscribe_key: 'sub-c-17b7db8a-3915-11e4-9868-02ee2ddab7fe',
  media: {
    audio: true,
    video:
    {
      height:200,
      width:280
    }
  },
  ssl: true
});