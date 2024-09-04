interface IBaseLocalDataItem{}
export interface ICommandComponentsData extends IBaseLocalDataItem{
  inputs: {[key: string]: string[] | number[]}
}
