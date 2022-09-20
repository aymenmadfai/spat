import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConfirmationComponent implements OnInit {
  constructor(public modal: NgbActiveModal) {}
  @Output() confirm: EventEmitter<boolean> = new EventEmitter();
  @Input() title!: string;
  @Input() text1!: string;
  @Input() text2!: string;
  ngOnInit(): void {}
  confirmation() {
    this.confirm.emit(true);
    this.modal.close();
  }
}
