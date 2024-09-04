import {CommandOutputComponent} from "../command-output/command-output.component";
import {Type} from "@angular/core";
import {CommandComponent} from "../command/command.component";


export interface ICommandComponentsData {
  component: Type<any>,
  inputs: {[key: string]: string[] | number[]}
}
export const data: ICommandComponentsData[] = [
  {
    component: CommandOutputComponent,
    inputs: {
      command: ['> ping -c 4 adamjambor.com'],
      output: ['PING adamjambor.com (192.168.1.1): 56 data bytes\',\n',
        '64 bytes from 192.168.1.1: icmp_seq=0 ttl=64 time=0.035 ms\',\n',
        '64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.034 ms\',\n',
        '64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.034 ms\',\n',
        '64 bytes from 192.168.1.1: icmp_seq=3 ttl=64 time=0.033 ms\',\n' +
        '--- adamjambor.com ping statistics ---\',\n' +
        '4 packets transmitted, 4 packets received, 0% packet loss\',\n' +
        '\',']
    }
  },
  {
    component: CommandComponent,
    inputs: {
      command: ['> nmap -p 1-65535 -T4 target.website.com\n'],
      output: ["Starting Nmap 7.80 ( https://nmap.org ) at 2024-09-03 12:34 UTC\n",
        "Nmap scan report for target.website.com (192.168.1.1)\n" +
        "Host is up (0.033s latency).\n" +
        "Not shown: 65532 closed ports\n" +
        "PORT      STATE SERVICE\n" +
        "22/tcp    open  ssh\n" +
        "80/tcp    open  http\n" +
        "443/tcp   open  https"]
    }
  }

]
