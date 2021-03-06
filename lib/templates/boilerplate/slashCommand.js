"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashCommandTemplate = void 0;
const pascalCase = require("pascal-case");
exports.slashCommandTemplate = (commandName) => {
    return `
import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, ISlashCommandPreview,
        ISlashCommandPreviewItem, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';

export class ${pascalCase(commandName)} implements ISlashCommand {
  public command = '';
  public i18nDescription = '';
  public i18nParamsExample = '';
  public permission = '';
  public providesPreview = false;

  public async executePreviewItem(item: ISlashCommandPreviewItem, context: SlashCommandContext,
                                  read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
      throw new Error('Method not implemented');
    }

  public async executor(context: SlashCommandContext,read: IRead, modify: IModify,
                        http: IHttp, persis: IPersistence): Promise<void> {
      throw new Error('Method not implemented');
    }

  public async previewer(context: SlashCommandContext, read: IRead, modify: IModify,
                         http: IHttp, persis: IPersistence): Promise<ISlashCommandPreview> {
      throw new Error('Method not implemented');
    }
}
`;
};
//# sourceMappingURL=slashCommand.js.map