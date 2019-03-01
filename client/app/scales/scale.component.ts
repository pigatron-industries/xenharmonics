import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, FormArray, FormControl, Validators} from '@angular/forms';

import {ScaleService} from './scale.service';
import {Scale} from './Scale';

@Component({
  selector: 'xen-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss']
})
export class ScaleComponent implements OnInit {

  scale: Scale = null;

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    octaveCents: new FormControl('', [
      Validators.required
    ]),
    notesCents: new FormArray([])
  });

  constructor(private scaleService: ScaleService,
              private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] === 'new') {
        this.afterLoad(new Scale());
      } else {
        this.load(params['id']);
      }
    });
  }

  public async load(id: number) {
    this.afterLoad(await this.scaleService.getById(id));
  }

  public afterLoad(data: Scale) {
    this.scale = data;
    this.removeAllNotes();
    for (let i = 0; i < this.scale.notesCents.length; i++) {
      this.createNoteControl(this.scale.notesCents[i]);
    }
    this.form.patchValue(data);
    this.form.markAsPristine();
  }

  public async save() {
    console.log(this.form.value);
    Object.assign(this.scale, this.form.value);
    const data = await this.scaleService.save(this.scale);
    this.afterLoad(data);
  }

  public addNote() {
    const notes = this.form.get('notesCents') as FormArray;
    const lastValue = notes.controls[notes.controls.length - 1].value;
    this.createNoteControl(lastValue);
    this.form.markAsDirty();
  }

  private removeAllNotes() {
    const notes = this.form.get('notesCents') as FormArray;
    notes.controls = [];
  }

  private createNoteControl(value) {
    const notes = this.form.get('notesCents') as FormArray;
    const noteControl = new FormControl('', []);
    noteControl.setValue(value);
    noteControl.valueChanges.subscribe(e => {
      noteControl.setValue(e, {emitEvent: false});
    });
    notes.push(noteControl);
  }

  public removeNote(i) {
    const notes = this.form.get('notesCents') as FormArray;
    notes.removeAt(i);
  }

  public sliderChange(event) {
    console.log(this.form.value);
  }

}
