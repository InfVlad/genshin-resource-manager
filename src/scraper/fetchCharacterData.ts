import axios from 'axios';
import cheerio from 'cheerio';
import { type CharacterData } from './types';
import { travelerData } from './travelerData';

export async function getCharacterData(characterUrl: string): Promise<CharacterData> {
  try {
    const response = await axios.get<string>(characterUrl);
    const $ = cheerio.load(response.data);
    // the wiki layout is a bit different for some characters, to control this:
    //
    if (characterUrl.toLowerCase().includes('traveler')) {
      return travelerData;
    }

    const name = $('#mw-content-text > div.mw-parser-output > aside > h2.pi-title').text();

    const weapon = $(
      '#mw-content-text > div.mw-parser-output > aside > section.pi-item.pi-group.pi-border-color > table > tbody > tr > td:nth-child(2) > span > a:nth-child(2)',
    ).text();
    const element = $(
      '#mw-content-text > div.mw-parser-output > aside > section.pi-item.pi-group.pi-border-color > table > tbody > tr > td:nth-child(3) > span > a:nth-child(2)',
    ).text();
    const rarity = $(
      '#mw-content-text > div.mw-parser-output > aside > section.pi-item.pi-group.pi-border-color > table > tbody > tr > td:nth-child(1) > img',
    ).attr('title');
    const normalBossMaterial = $(
      `#mw-content-text > div.mw-parser-output > span.card-list-container > .card-container:nth-of-type(2) > span.card-caption > a`,
    ).text();
    const ascensionGemTier1 = $(
      `#mw-content-text > div.mw-parser-output > span.card-list-container > .card-container:nth-of-type(3) > span.card-caption > a`,
    ).text();
    const ascensionGemTier2 = $(
      `#mw-content-text > div.mw-parser-output > span.card-list-container > .card-container:nth-of-type(4) > span.card-caption > a`,
    ).text();
    const ascensionGemTier3 = $(
      `#mw-content-text > div.mw-parser-output > span.card-list-container > .card-container:nth-of-type(5) > span.card-caption > a`,
    ).text();
    const ascensionGemTier4 = $(
      `#mw-content-text > div.mw-parser-output > span.card-list-container > .card-container:nth-of-type(6) > span.card-caption > a`,
    ).text();
    const localSpecialty = $(
      `#mw-content-text > div.mw-parser-output > span.card-list-container > .card-container:nth-of-type(7) > span.card-caption > a`,
    ).text();
    const commonMaterialTier1 = $(
      '#mw-content-text > div.mw-parser-output > table.wikitable:nth-of-type(3) + div > .card-container:nth-of-type(2) > .card-caption > a',
    ).text();
    const commonMaterialTier2 = $(
      '#mw-content-text > div.mw-parser-output > table.wikitable:nth-of-type(3) + div > .card-container:nth-of-type(3) > .card-caption > a',
    ).text();
    const commonMaterialTier3 = $(
      '#mw-content-text > div.mw-parser-output > table.wikitable:nth-of-type(3) + div > .card-container:nth-of-type(4) > .card-caption > a',
    ).text();
    const talentBookTier1 = $(
      '#mw-content-text > div.mw-parser-output > table.wikitable:nth-of-type(3) + div > .card-container:nth-of-type(5) > .card-caption > a',
    ).text();
    const talentBookTier2 = $(
      '#mw-content-text > div.mw-parser-output > table.wikitable:nth-of-type(3) + div > .card-container:nth-of-type(6) > .card-caption > a',
    ).text();
    const talentBookTier3 = $(
      '#mw-content-text > div.mw-parser-output > table.wikitable:nth-of-type(3) + div > .card-container:nth-of-type(7) > .card-caption > a',
    ).text();
    const weeklyBossMaterial = $(
      '#mw-content-text > div.mw-parser-output > table.wikitable:nth-of-type(3) + div > .card-container:nth-of-type(8) > .card-caption > a',
    ).text();
    const specialMaterial = $(
      '#mw-content-text > div.mw-parser-output > table.wikitable:nth-of-type(3) + div > .card-container:nth-of-type(9) > .card-caption > a',
    ).text();
    let normalAttack = $(
      '#mw-content-text > div.mw-parser-output > table.wikitable.talent-table > tbody > tr:nth-child(2) > td:nth-child(2) > a',
    ).text();
    const elementalSkill = $(
      '#mw-content-text > div.mw-parser-output > table.wikitable.talent-table > tbody > tr:nth-child(4) > td:nth-child(2) > a',
    ).text();
    const elementalBurst = $(
      '#mw-content-text > div.mw-parser-output > table.wikitable.talent-table > tbody > tr:nth-child(6) > td:nth-child(2) > a',
    ).text();

    if (normalAttack.includes('(')) {
      normalAttack = normalAttack.replace(/\s\(.+/, '');
    }
    if (!rarity) {
      throw new Error('no rarity');
    }

    return {
      name,
      weapon,
      element,
      rarity,
      weeklyBossMaterial, //
      normalBossMaterial, //
      specialMaterial,
      localSpecialty, //
      ascensionGems: {
        ascensionGemTier1,
        ascensionGemTier2,
        ascensionGemTier3,
        ascensionGemTier4,
      },
      talentBook: {
        talentBookTier1,
        talentBookTier2,
        talentBookTier3,
      },
      commonMaterial: {
        commonMaterialTier1,
        commonMaterialTier2,
        commonMaterialTier3,
      },
      normalAttack,
      elementalSkill,
      elementalBurst,
    };
  } catch (error) {
    throw new Error(String(error));
  }
}
