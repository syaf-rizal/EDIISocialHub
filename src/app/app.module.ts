import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from "@angular/http";
import { Camera } from "@ionic-native/camera";

import { MyApp } from './app.component';
import { TimelinePage } from "../pages/timeline/timeline";
import { ApplicationsPage } from "../pages/applications/applications";
import { MessagesPage } from "../pages/messages/messages";
import { ProfilePage } from "../pages/profile/profile";
import { SharetimelinePage } from "../pages/sharetimeline/sharetimeline";
import { AboutApplicationPage } from "../pages/about-application/about-application";
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { RestServiceProvider } from '../providers/rest-service/rest-service';
import { HomePageModule } from "../pages/home/home.module";
import { CommentsTimelineComponent } from "../components/comments-timeline/comments-timeline";
import { ShrinkingSegmentHeaderComponent } from "../components/shrinking-segment-header/shrinking-segment-header";
import { PopoverBarHeaderComponent } from "../components/popover-bar-header/popover-bar-header";
import { ElasticModule } from "ng-elastic";

@NgModule({
  declarations: [
    MyApp,
    TimelinePage,
    ApplicationsPage,
    MessagesPage,
    ProfilePage,
    SharetimelinePage,
    AboutApplicationPage,
    CommentsTimelineComponent,
    ShrinkingSegmentHeaderComponent,
    PopoverBarHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    HomePageModule,
    ElasticModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TimelinePage,
    ApplicationsPage,
    MessagesPage,
    ProfilePage,
    SharetimelinePage,
    AboutApplicationPage,
    CommentsTimelineComponent,
    PopoverBarHeaderComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    RestServiceProvider
  ]
})
export class AppModule {}
