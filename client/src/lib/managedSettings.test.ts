import { describe, expect, it } from "vitest";
import { defaultHeroSettings, readJsonSetting } from "./adminCommerce";

describe("réglages publics InnovTech", () => {
  it("préserve une bannière de secours lorsque la valeur stockée est vide ou invalide", () => {
    expect(readJsonSetting(undefined, defaultHeroSettings)).toEqual(defaultHeroSettings);
    expect(readJsonSetting('{"titleFr":"Une nouvelle bannière"}', defaultHeroSettings).titleFr).toBe("Une nouvelle bannière");
    expect(readJsonSetting("{", defaultHeroSettings)).toEqual(defaultHeroSettings);
  });
});
