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

//to access the uploaded files
export const userImageUrl = mainDomain + "/public/uploads/";
export const vibespotImageUrl = mainDomain + "/public/";

//available Url Hit
export const serverCheckUserNameAvailabilityUrl =
  mainDomain + "/user/check-username?username=";

//server-side profile-setting url
export const serverProfileSettingUrl = mainDomain + "/user/profile-setting";

//available Url Hit
export const serverCheckDuplicateEmailUrl =
  mainDomain + "/user/check-email?email=";

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
export const serverPostComment = mainDomain + "/dashboard/post-comment";

//server-side like the post
export const serverLikeVibeSpot = mainDomain + "/dashboard/like-vibespot";

//server-side visit the post
export const serverVisitVibeSpot = mainDomain + "/dashboard/visit-vibespot";

//server-side fetch all the vibespots of the user using userId
export const serverFetchMyVibeSpots = mainDomain + "/dashboard/user-vibespots";
export const serverFetchLikedVibeSpots =
  mainDomain + "/dashboard/liked-vibespots";
export const serverFetchVisitedVibeSpots =
  mainDomain + "/dashboard/visited-vibespots";
