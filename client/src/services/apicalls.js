/**
 *
 * urls prefix
 */
//website url
//const mainDomain = "https://localevibe.onrender.com";
const mainDomain = "http://localhost:3001";
//googlemap query url
export const googleMapSearchUrl =
  "https://www.google.com/maps/search/?api=1&query=";

export const userImageUrl = mainDomain + "/public/uploads/";
export const vibespotImageUrl = mainDomain + "/public/";

//available Url Hit
export const serverCheckUserNameAvailabilityUrl =
  mainDomain + "/check-username?username=";

//server-side profile-setting url
export const serverProfileSettingUrl = mainDomain + "/profile-setting";

//available Url Hit
export const serverCheckDuplicateEmailUrl = mainDomain + "/check-email?email=";

//server-side signup url
export const serverSignUpUrl = mainDomain + "/auth/signup";

//server-side signup url
export const serverSignInUrl = mainDomain + "/auth/signin";

//server-side addVibeSpot url
export const serverAddVibeSpotUrl = mainDomain + "/dashboard/add-vibespot";

//server-side getUseData url
export const serverGetUserDataUrl = mainDomain + "/user/user-data/";

//server-side vibespot image uploads url
export const serverVibeSpotImageUploadUrl = mainDomain + "/uploads/vibespot";

//server-side user image uploads url
export const serverUserImageUploadUrl = mainDomain + "/profile-setting/upload";

//server-side vibe spot
export const serverVibeSpotUrl = mainDomain + "/vibespot";

//server-side post comment url
export const serverPostComment = mainDomain + "/post-comment";

//server-side like the post
export const serverLikeVibeSpot = mainDomain + "/like-vibespot";

//server-side visit the post
export const serverVisitVibeSpot = mainDomain + "/visit-vibespot";
