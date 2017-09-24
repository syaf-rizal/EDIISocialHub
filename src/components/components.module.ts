import { NgModule } from '@angular/core';
import { ShrinkingSegmentHeaderComponent } from './shrinking-segment-header/shrinking-segment-header';
import { PopoverBarHeaderComponent } from './popover-bar-header/popover-bar-header';
import { CommentsTimelineComponent } from './comments-timeline/comments-timeline';
@NgModule({
	declarations: [ShrinkingSegmentHeaderComponent,
    PopoverBarHeaderComponent,
    CommentsTimelineComponent],
	imports: [],
	exports: [ShrinkingSegmentHeaderComponent,
    PopoverBarHeaderComponent,
    CommentsTimelineComponent]
})
export class ComponentsModule {}
