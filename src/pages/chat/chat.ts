import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { ChatService, Message, MessageData } from '../../providers/request/chat';
import { RequestService } from '../../providers/request/request';
import { DomSanitizer } from '@angular/platform-browser';
import Recorder from 'recorder-js';
import { switchMap, skipWhile } from 'rxjs/operators';
import { HttpConfig } from '../../configs/http.config';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
})
export class ChatPage {

    source = HttpConfig.SOURCE_URL + '/';
    inputMessage: string;
    messageRows = new Array<Message>();

    private selfUid = 'xfsdafewqr324';
    private friendUid = 'fdsfa3531543';
    private selfAvatar = 'assets/imgs/avatar/1.png';
    private friendAvatar = 'assets/imgs/avatar/0.jpg';
    private recorder: Recorder;
    private audio: any;

    @ViewChild('content') content: Content;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public domSanitizer: DomSanitizer,
        private request: RequestService,
        private chat: ChatService,
    ) { }

    ionViewDidLoad() {
        this.chat.getInstance(this.selfUid).subscribe(msg => {
            const msgData: MessageData = JSON.parse(msg);
            this.messageRows.push({
                status: 1,
                self: false,
                avatar: this.friendAvatar,
                message: msgData
            });
            setTimeout(() => this.content.scrollToBottom(), 200);
        });
        //     this.messageRows.push(...[
        //         {
        //             status: 0,
        //             self: true,
        //             avatar: 'assets/imgs/avatar/1.png',
        //             message: {
        //                 from: '1111',
        //                 to: '2222',
        //                 message: {
        //                     type: 'text',
        //                     content: '你好吗'
        //                 }
        //             }
        //         },
        //         {
        //             status: 1,
        //             self: true,
        //             avatar: this.selfAvatar,
        //             message: {
        //                 from: this.selfUid,
        //                 to: this.friendUid,
        //                 message: {
        //                     type: 'image',
        //                     content: 'https://www.cool1024.com/ckeditor/41ff89fa9f5c007f8c6fae02d7563282.jpg'
        //                 }
        //             }
        //         },
        //         {
        //             status: 0,
        //             self: true,
        //             avatar: 'assets/imgs/avatar/0.jpg',
        //             message: {
        //                 from: '1111',
        //                 to: '2222',
        //                 message: {
        //                     type: 'sound',
        //                     content: 'https://hello1024.oss-cn-beijing.aliyuncs.com/mssage.mp3'
        //                 }
        //             }
        //         }
        //     ]);
    }

    /**
     * 重发消息
     * @param msg 消息
     */
    trySend(msg: Message) {
        if (msg.status === 2) {
            msg.status = 0;
            switch (msg.message.message.type) {
                case 'text': {
                    this.chat.sendMessageTo(msg).subscribe(res => msg.status = res.result ? 1 : 2);
                    break;
                }
                case 'image': {
                    this.uploadImage(msg, URL.createObjectURL(msg.blob), msg.blob);
                    break;
                }
                case 'sound': {
                    this.uploadRecord(msg, URL.createObjectURL(msg.blob), msg.blob);
                    break;
                }
            }
        }
    }

    sendMessage() {
        const msg = this.chat.newTextMsg(this.selfAvatar, this.selfUid, this.friendUid, this.inputMessage);
        this.messageRows.push(msg);
        this.inputMessage = '';
        this.chat.sendMessageTo(msg).subscribe(res => msg.status = 1);
        setTimeout(() => this.content.scrollToBottom(), 200);
    }

    sendImage() {
        const inputFile = document.createElement('input');
        inputFile.type = 'file';
        inputFile.onchange = () => {
            let url: any = URL.createObjectURL(inputFile.files[0]);
            url = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
            const msg = this.chat.newImageMsg(
                this.selfAvatar,
                this.selfUid,
                this.friendUid,
                url
            );
            msg.blob = inputFile.files[0];
            this.messageRows.push(msg);
            // 先上传图片再发送消息
            this.uploadImage(msg, url, msg.blob)
            setTimeout(() => this.content.scrollToBottom(), 200);
        };
        inputFile.click();
    }

    sendSound() {
        if (!this.recorder) {
            navigator.getUserMedia = navigator.getUserMedia;
            navigator.getUserMedia({ video: false, audio: true }, (stream) => {
                const context = new AudioContext();
                this.recorder = new Recorder(context, {});
                this.recorder.init(stream);
                this.startRecord();
            }, (error) => {
                console.log('获取麦克风失败', error);
            });
        } else {
            this.startRecord();
        }
    }

    startRecord() {
        this.recorder.start().then(() => { });
        setTimeout(() => {
            console.log(this.recorder, '停止录音');
            this.recorder.stop()
                .then(({ blob, buffer }) => {
                    console.log('录音结束');
                    const url = URL.createObjectURL(blob);
                    const msg = this.chat.newSoundMsg(
                        this.selfAvatar,
                        this.selfUid,
                        this.friendUid,
                        url
                    );
                    msg.blob = blob;
                    this.messageRows.push(msg);
                    this.uploadRecord(msg, url, blob);
                    setTimeout(() => this.content.scrollToBottom(), 200);
                })
                .catch(error => {

                });
        }, 1000);
    }

    uploadImage(msg: Message, url: any, image: any) {
        this.request.files('/devexample/upload/file', {}, [{ name: 'file', files: [image] }], false)
            .pipe(
                skipWhile(res => {
                    if (!res.result) {
                        msg.status = 2;
                    }
                    return !res.result;
                }),
                switchMap(res => {
                    msg.message.message.content = res.datas;
                    return this.chat.sendMessageTo(msg)
                })
            )
            .subscribe(res => {
                msg.message.message.content = url;
                msg.status = 1;
            });
    }

    uploadRecord(msg: Message, url: any, record: Blob) {
        // 先上传图片再发送消息
        this.request.files('/devexample/upload/file', {}, [{ name: 'file', files: [new File([record], 'record.wav')] }], false)
            .pipe(
                skipWhile(res => {
                    if (!res.result) {
                        msg.status = 2;
                    }
                    return !res.result;
                }),
                switchMap(res => {
                    msg.message.message.content = res.datas;
                    return this.chat.sendMessageTo(msg)
                })
            )
            .subscribe(res => {
                msg.message.message.content = url;
                msg.status = 1;
            });
    }

    playSound(src: string) {
        if (this.audio) {
            this.audio.pause();
        }
        this.audio = new Audio(src);
        this.audio.play();
    }
}
