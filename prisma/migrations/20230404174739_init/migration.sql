/*
  Warnings:

  - You are about to drop the column `abilityId` on the `pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `base_xp` on the `pokemon` table. All the data in the column will be lost.
  - Added the required column `baseXp` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slot` to the `PokemonTypes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pokemon` DROP FOREIGN KEY `Pokemon_abilityId_fkey`;

-- AlterTable
ALTER TABLE `pokemon` DROP COLUMN `abilityId`,
    DROP COLUMN `base_xp`,
    ADD COLUMN `baseXp` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `pokemontypes` ADD COLUMN `slot` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `PokemonAbilities` (
    `pokemonId` INTEGER NOT NULL,
    `abilityId` INTEGER NOT NULL,
    `slot` INTEGER NOT NULL,

    PRIMARY KEY (`pokemonId`, `abilityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PokemonAbilities` ADD CONSTRAINT `PokemonAbilities_pokemonId_fkey` FOREIGN KEY (`pokemonId`) REFERENCES `Pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PokemonAbilities` ADD CONSTRAINT `PokemonAbilities_abilityId_fkey` FOREIGN KEY (`abilityId`) REFERENCES `Ability`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
