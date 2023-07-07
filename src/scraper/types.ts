export interface CharacterData {
  name: string;
  weapon: string;
  element: string;
  rarity: string;
  weeklyBossMaterial: string;
  normalBossMaterial: string;
  specialMaterial: string;
  localSpecialty: string; //
  ascensionGems: {
    ascensionGemTier1: string;
    ascensionGemTier2: string;
    ascensionGemTier3: string;
    ascensionGemTier4: string;
  };
  talentBook: {
    talentBookTier1: string;
    talentBookTier2: string;
    talentBookTier3: string;
  };
  commonMaterial: {
    commonMaterialTier1: string;
    commonMaterialTier2: string;
    commonMaterialTier3: string;
  };
  normalAttack: string;
  elementalSkill: string;
  elementalBurst: string;
}

export interface ImageUrl {
  url: string;
  imageName: string;
}
