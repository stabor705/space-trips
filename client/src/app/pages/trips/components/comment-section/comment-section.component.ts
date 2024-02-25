import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {Review} from "../../../../models/review";
import {CommentService} from "../../../../services/comment.service";
import {Trip, TripId} from "../../../../models/trip.model";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'agh-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentSectionComponent {
  @Input() trip: Trip;


  constructor(private readonly commentService: CommentService, private readonly message: NzMessageService, private readonly cdRef: ChangeDetectorRef) {
  }

  removeReview(reviewId: string | undefined) {
    reviewId && this.commentService.removeReview(this.trip._id, reviewId).subscribe({
      next: (trip) => {
        this.trip = trip
        this.message.success('Komentarz usuniety');
        this.cdRef.detectChanges();
      },
      error: (res) => this.message.error(res.error.message)
    })
  }
}
