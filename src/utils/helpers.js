export const checkPlatform = (platform) => {
  return window.cordova && window.cordova.platformId === platform;
};
